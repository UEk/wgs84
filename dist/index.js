"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointUp = exports.pointEast = exports.pointNorth = exports.distanceTotal = exports.distanceE = exports.distanceN = exports.PointWGS84 = void 0;
class PointWGS84 {
    constructor(lat, lon, height) {
        this.R = 6378.137 * 1000;
        this.f = 1 / 298.257223563;
        this.eSquared = this.f * (2 - this.f);
        if (-90 <= lat && lat <= 90) {
            this.myLatInRad = degToRad(lat);
        }
        else {
            throw new Error(`WGS84 Latitude=${lat} out of range`);
        }
        if (-180 <= lon && lon <= 180) {
            this.myLonInRad = degToRad(lon);
        }
        else {
            throw new Error(`WGS84 Longitude=${lon} out of range`);
        }
        this.myHeightInM = height ? height : 0;
        this.myR1 =
            (this.R * (1 - this.eSquared)) /
                Math.pow(1 - this.eSquared * Math.pow(Math.sin(this.myLatInRad), 2), 3 / 2);
        this.myR2 = this.R / Math.sqrt(1 - this.eSquared * Math.pow(Math.sin(this.myLatInRad), 2));
    }
    static fromGeoJson(x) {
        if ((x.type === 'Point' || x.type === 'point') &&
            x.coordinates.length >= 2 &&
            x.coordinates.length <= 3) {
            return x.coordinates[2]
                ? new PointWGS84(x.coordinates[1], x.coordinates[0], x.coordinates[2])
                : new PointWGS84(x.coordinates[1], x.coordinates[0], 0);
        }
        else {
            throw new Error('WGS84: Input is not GeoJSON  Point');
        }
    }
    get lon() {
        return radToDeg(this.myLonInRad);
    }
    get lat() {
        return radToDeg(this.myLatInRad);
    }
    get lonInRad() {
        return this.myLonInRad;
    }
    get latInRad() {
        return this.myLatInRad;
    }
    get height() {
        return this.myHeightInM;
    }
    get R1() {
        return this.myR1;
    }
    get R2() {
        return this.myR2;
    }
    get geoJson() {
        return { coordinates: [this.lon, this.lat, this.height], type: 'Point' };
    }
}
exports.PointWGS84 = PointWGS84;
function distanceN(x, y) {
    return x.R1 * (y.latInRad - x.latInRad);
}
exports.distanceN = distanceN;
function distanceE(x, y) {
    return x.R2 * Math.cos(x.latInRad) * (y.lonInRad - x.lonInRad);
}
exports.distanceE = distanceE;
function distanceTotal(x, y) {
    return Math.sqrt(distanceN(x, y) * distanceN(x, y) + distanceE(x, y) * distanceE(x, y));
}
exports.distanceTotal = distanceTotal;
function pointNorth(x, dN) {
    return new PointWGS84(radToDeg(x.latInRad + dN / x.R1), x.lon, x.height);
}
exports.pointNorth = pointNorth;
function pointEast(x, dE) {
    return new PointWGS84(x.lat, radToDeg(x.lonInRad + dE / (x.R2 * Math.cos(x.latInRad))), x.height);
}
exports.pointEast = pointEast;
function pointUp(x, dH) {
    return new PointWGS84(x.lat, x.lon, x.height + dH);
}
exports.pointUp = pointUp;
function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
function radToDeg(rad) {
    return (rad * 180) / Math.PI;
}
//# sourceMappingURL=index.js.map