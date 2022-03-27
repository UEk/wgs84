/**
 * GeoJSON definition from
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/geojson/index.d.ts
 */
export interface Point {
    type: 'Point';
    coordinates: number[];
}

/**
 * creates a GeoJSON Point
 * will throw for impossible input
 * @param lat in degrees, has to be -90 < lat < 90
 * @param lon in degrees, has to be -180 <= lon < 180
 * @param height in meters
 * @returns GeoJSON Point
 */
export function point(lat: number, lon: number, height?: number): Point {
    if (-90 < lat && lat < 90 && -180 <= lon && lon <= 180) {
        return height
            ? { coordinates: [lon, lat, height], type: 'Point' }
            : { coordinates: [lon, lat], type: 'Point' };
    } else {
        throw new Error(`Lat=$(lat)) or lon=$(lon) out of range`);
    }
}

// Earth equatorial radius (in meters)
const R: number = 6378.137 * 1000;
// the flattening of the earth in WGS84
const f: number = 1 / 298.257_223_563;
// e^2=f (2-f)= 6.69437999014131699614 ×10^(-3)
const eSquared: number = f * (2 - f);

/**
 * The meridional radius of curvature at a certain geographical position
 * will throw for impossible input
 * @param position The current position
 * @returns meters
 */
export function R1(position: Point): number {
    validCoord(position);
    const lat = degToRad(position.coordinates[1]);
    return (R * (1 - eSquared)) / Math.pow(1 - eSquared * Math.pow(Math.sin(lat), 2), 3 / 2);
}

/**
 * The radius of curvature in the prime vertical at a certain geographical position
 * will throw for impossible input
 * @param position The current position
 * @returns meters
 */
export function R2(position: Point): number {
    validCoord(position);
    const lat = degToRad(position.coordinates[1]);
    return R / Math.sqrt(1 - eSquared * Math.pow(Math.sin(lat), 2));
}

/**
 * Calculates the distance in meters along a northern meridian
 * will throw for impossible input
 * @param origin the starting point
 * @param target the ending point
 * @returns meters
 */
export function distanceNorth(origin: Point, target: Point): number {
    validCoord(origin);
    validCoord(target);
    const xLat = degToRad(origin.coordinates[1]);
    const yLat = degToRad(target.coordinates[1]);
    return R1(origin) * (yLat - xLat);
}

/**
 * Calculates the distance in meters along an eastern meridian
 * will throw for impossible input
 * @param origin the starting point
 * @param target the ending point
 * @returns meters
 */
export function distanceEast(origin: Point, target: Point): number {
    validCoord(origin);
    validCoord(target);
    const xLat = degToRad(origin.coordinates[1]);
    const xLon = degToRad(origin.coordinates[0]);
    const yLon = degToRad(target.coordinates[0]);
    return R2(origin) * Math.cos(xLat) * (yLon - xLon);
}

/**
 * Calculates the vertical distance in meters
 * @param origin the starting point
 * @param target the ending point
 * @returns meters
 */
export function distanceUp(origin: Point, target: Point): number {
    if (origin.coordinates.length === 3 && target.coordinates.length === 3) {
        return target.coordinates[2] - origin.coordinates[2];
    } else {
        throw new Error('Input is not GeoJSON Point with height.');
    }
}

/**
 * Calculates the distance in meters between origin and target
 * Will take height into consideration, if given for both points
 * will throw for impossible input
 * @param origin the origin point
 * @param target the resulting point
 * @returns meters
 */
export function distance(origin: Point, target: Point): number {
    if (origin.coordinates.length === 2 || target.coordinates.length === 2) {
        return Math.sqrt(distanceNorth(origin, target) ** 2 + distanceEast(origin, target) ** 2);
    } else if (origin.coordinates.length === 3 && target.coordinates.length === 3) {
        return Math.sqrt(
            distanceNorth(origin, target) ** 2 +
                distanceEast(origin, target) ** 2 +
                distanceUp(origin, target) ** 2
        );
    } else {
        throw new Error('Inputs are not GeoJSON Points.');
    }
}

/**
 * Calculates the bearing from origin to target in the plane
 * with 0 degrees being north, and 90 degrees being east
 * will throw for impossible input
 * @param origin the origin point
 * @param target the target point
 * @returns degrees
 */
export function bearing(origin: Point, target: Point): number {
    validCoord(origin);
    validCoord(target);
    // mod(atan2(distance_East, distance_North), 2*pi)
    return (
        (radToDeg(Math.atan2(distanceEast(origin, target), distanceNorth(origin, target))) + 360) %
        360
    );
}

/**
 * Gives a new point at a distance dN north of the current point
 * will throw for impossible input
 * @param origin the origin point
 * @param dN the distance along a northern meridian, negative number gives distance to south
 * @returns
 */
export function pointNorth(origin: Point, dN: number): Point {
    validCoord(origin);
    const lat = radToDeg(degToRad(origin.coordinates[1]) + dN / R1(origin));
    const lon = origin.coordinates[0];
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        return { coordinates: [lon, lat, h], type: 'Point' };
    } else {
        return { coordinates: [lon, lat], type: 'Point' };
    }
}

/**
 * Gives a new point at a distance dE east of the current point
 * will throw for impossible input
 * @param origin the origin point
 * @param dE the distance along an eastern meridian, negative number gives distance to west
 * @returns
 */
export function pointEast(origin: Point, dE: number): Point {
    validCoord(origin);
    const lat = origin.coordinates[1];
    const lon = radToDeg(
        degToRad(origin.coordinates[0]) + dE / (R2(origin) * Math.cos(degToRad(lat)))
    );
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        return { coordinates: [lon, lat, h], type: 'Point' };
    } else {
        return { coordinates: [lon, lat], type: 'Point' };
    }
}

/**
 * Gives a new point at a distance dE east of the current point
 * will throw for impossible input
 * @param origin the origin point
 * @param dH the distance up in meters, negative number gives a lower height
 * @returns
 */
export function pointUp(origin: Point, dH: number): Point {
    return {
        coordinates: [origin.coordinates[0], origin.coordinates[1], origin.coordinates[2] + dH],
        type: 'Point'
    };
}

function degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
    return (rad * 180) / Math.PI;
}

function validCoord(p: Point): boolean {
    if (
        -90 <= p.coordinates[1] &&
        p.coordinates[1] < 90 &&
        -180 <= p.coordinates[0] &&
        p.coordinates[0] <= 180
    ) {
        return true;
    } else {
        throw new Error(`Lat=$(lat)) or lon=$(lon) out of range`);
    }
}
