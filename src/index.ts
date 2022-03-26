/**
 * GeoJSON definition
 */
export type GeoJson = { type: string; coordinates: number[] };

/**
 * Class to keep all data for a position in WGS84
 */
export class PointWGS84 {
    private readonly myLatInRad: number; // in radians
    private readonly myLonInRad: number; // in radians
    private readonly myHeightInM: number; // in meters

    // Earth equatorial radius (in meters)
    private readonly R: number = 6378.137 * 1000;
    // the flattening of the earth in WGS84
    private readonly f: number = 1 / 298.257_223_563;
    // e^2=f (2-f)= 6.69437999014131699614 ×10^(-3)
    private readonly eSquared: number = this.f * (2 - this.f);
    // Local radii based on latitude, computed in the constructor
    private readonly myR1: number;
    private readonly myR2: number;
    /**
     * Constructor
     * Will throw if fed lon, lat parameters out-of-range
     * @param lat Latitude in degrees -90 <= lat <= 90
     * @param lon Longitude in degrees -180 <= lon <= 180
     * @param height Height in meters. If omitted height = 0.
     */
    constructor(lat: number, lon: number, height?: number) {
        if (-90 <= lat && lat <= 90) {
            this.myLatInRad = degToRad(lat);
        } else {
            throw new Error(`WGS84 Latitude=${lat} out of range`);
        }
        if (-180 <= lon && lon <= 180) {
            this.myLonInRad = degToRad(lon);
        } else {
            throw new Error(`WGS84 Longitude=${lon} out of range`);
        }
        this.myHeightInM = height ? height : 0;

        // R1=a(1-e^2)/(1-e^2*(sin(lat0))^2)^(3/2)
        this.myR1 =
            (this.R * (1 - this.eSquared)) /
            Math.pow(1 - this.eSquared * Math.pow(Math.sin(this.myLatInRad), 2), 3 / 2);

        // R2=a/sqrt(1-e^2*(sin(lat0))^2)
        this.myR2 = this.R / Math.sqrt(1 - this.eSquared * Math.pow(Math.sin(this.myLatInRad), 2));
    }
    /**
     * Static constructor giving a PointWGS84 object
     * from an input of GeoJSON definition with 2 or 3 coordinates
     * Throws if the GeoJson is not correctly formatted
     * @param x = {"type": "Point", "coordinates": [100.0, 0.0]}
     */
    public static fromGeoJson(x: GeoJson): PointWGS84 {
        if (
            (x.type === 'Point' || x.type === 'point') &&
            x.coordinates.length >= 2 &&
            x.coordinates.length <= 3
        ) {
            return x.coordinates[2]
                ? new PointWGS84(x.coordinates[1], x.coordinates[0], x.coordinates[2])
                : new PointWGS84(x.coordinates[1], x.coordinates[0], 0);
        } else {
            throw new Error('WGS84: Input is not GeoJSON  Point');
        }
    }
    /**
     * Get the longitude of the wgs84 point in degrees
     */
    public get lon(): number {
        return radToDeg(this.myLonInRad);
    }
    /**
     * Get the latitude of the wgs84 point in degrees
     */
    public get lat(): number {
        return radToDeg(this.myLatInRad);
    }
    /**
     * Get the longitude of the wgs84 point in radians
     */
    public get lonInRad(): number {
        return this.myLonInRad;
    }
    /**
     * Get the latitude of the wgs84 point in radians
     */
    public get latInRad(): number {
        return this.myLatInRad;
    }
    /**
     * Get the height of the wgs84 point in meters
     */
    public get height(): number {
        return this.myHeightInM;
    }

    public get R1(): number {
        return this.myR1;
    }

    public get R2(): number {
        return this.myR2;
    }
    /**
     * Get the wgs84 point as a GeoJSON
     * @returns {"type": "Point", "coordinates": [100.0, 0.0]}
     */
    public get geoJson(): GeoJson {
        return { coordinates: [this.lon, this.lat, this.height], type: 'Point' };
    }
}

/**
 * Calculates the distance in meters according to a northern meridian
 * @param x the starting point
 * @param y the ending point
 * @returns meters
 */
export function distanceN(x: PointWGS84, y: PointWGS84): number {
    // Returns the distance along the north axis from x to y
    return x.R1 * (y.latInRad - x.latInRad);
}

/**
 * Calculates the distance in meters according to a easter meridian
 * @param x the starting point
 * @param y the ending point
 * @returns meters
 */
export function distanceE(x: PointWGS84, y: PointWGS84): number {
    // returns the distance along the east axis from x to y
    return x.R2 * Math.cos(x.latInRad) * (y.lonInRad - x.lonInRad);
}

/**
 * Calculates the distance in meters between x and y points in the plane
 * @param x the origin point
 * @param y the resulting point
 * @returns meters
 */
export function distance(x: PointWGS84, y: PointWGS84): number {
    return Math.sqrt(distanceN(x, y) * distanceN(x, y) + distanceE(x, y) * distanceE(x, y));
}

/**
 * Calculates the bearing from x point to y point in the plane
 * @param x the origin point
 * @param y the target point
 * @returns meters
 */
export function bearing(x: PointWGS84, y: PointWGS84): number {
    // mod(atan2(distance_East, distance_North), 2*pi)
    return (radToDeg(Math.atan2(distanceE(x, y), distanceN(x, y))) + 360) % 360;
}

/**
 * Gives a new point at a distance dN north of the current point
 * @param x the origin point
 * @param dN the distance along a northern meridian, negative number gives distance to south
 * @returns
 */
export function pointNorth(x: PointWGS84, dN: number): PointWGS84 {
    // returns
    // lat=d_N/R_1   +lat_sys
    return new PointWGS84(radToDeg(x.latInRad + dN / x.R1), x.lon, x.height);
}

/**
 * Gives a new point at a distance dE east of the current point
 * @param x the origin point
 * @param dN the distance along an eastern meridian, negative number gives distance to west
 * @returns
 */
export function pointEast(x: PointWGS84, dE: number): PointWGS84 {
    // lon=d_E/(R_2  cos⁡(lat_sys ) )+lon_sys
    return new PointWGS84(
        x.lat,
        radToDeg(x.lonInRad + dE / (x.R2 * Math.cos(x.latInRad))),
        x.height
    );
}

/**
 * Gives a new point at a distance dE east of the current point
 * @param x the origin point
 * @param dH the distance up in meters, negative number gives a lower height
 * @returns
 */
export function pointUp(x: PointWGS84, dH: number): PointWGS84 {
    return new PointWGS84(x.lat, x.lon, x.height + dH);
}

function degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
    return (rad * 180) / Math.PI;
}
