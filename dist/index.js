"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointAbove = exports.pointEastOf = exports.pointNorthOf = exports.bearing = exports.distance = exports.distanceUp = exports.distanceEast = exports.distanceNorth = exports.R2 = exports.R1 = exports.point = void 0;
function point(lat, lon, height) {
    const result = height
        ? { coordinates: [lon, lat, height], type: 'Point' }
        : { coordinates: [lon, lat], type: 'Point' };
    validCoord(result);
    return result;
}
exports.point = point;
const R = 6378.137 * 1000;
const f = 1 / 298.257223563;
const eSquared = f * (2 - f);
function R1(position) {
    validCoord(position);
    const lat = degToRad(position.coordinates[1]);
    return (R * (1 - eSquared)) / Math.pow(1 - eSquared * Math.pow(Math.sin(lat), 2), 3 / 2);
}
exports.R1 = R1;
function R2(position) {
    validCoord(position);
    const lat = degToRad(position.coordinates[1]);
    return R / Math.sqrt(1 - eSquared * Math.pow(Math.sin(lat), 2));
}
exports.R2 = R2;
function distanceNorth(origin, target) {
    validCoord(origin);
    validCoord(target);
    const originLat = degToRad(origin.coordinates[1]);
    const targetLat = degToRad(target.coordinates[1]);
    return R1(origin) * (targetLat - originLat);
}
exports.distanceNorth = distanceNorth;
function distanceEast(origin, target) {
    validCoord(origin);
    validCoord(target);
    const originLat = degToRad(origin.coordinates[1]);
    const originLon = degToRad(origin.coordinates[0]);
    const targetLon = degToRad(target.coordinates[0]);
    let deltaAngle = targetLon - originLon;
    if (deltaAngle > Math.PI) {
        deltaAngle -= 2 * Math.PI;
    }
    else if (targetLon - originLon < -Math.PI) {
        deltaAngle += 2 * Math.PI;
    }
    return R2(origin) * Math.cos(originLat) * deltaAngle;
}
exports.distanceEast = distanceEast;
function distanceUp(origin, target) {
    if (origin.coordinates.length === 3 && target.coordinates.length === 3) {
        return target.coordinates[2] - origin.coordinates[2];
    }
    else {
        throw new Error('Input is not GeoJSON Point with height.');
    }
}
exports.distanceUp = distanceUp;
function distance(origin, target) {
    if (origin.coordinates.length === 2 || target.coordinates.length === 2) {
        return Math.sqrt(distanceNorth(origin, target) ** 2 + distanceEast(origin, target) ** 2);
    }
    else if (origin.coordinates.length === 3 && target.coordinates.length === 3) {
        return Math.sqrt(distanceNorth(origin, target) ** 2 +
            distanceEast(origin, target) ** 2 +
            distanceUp(origin, target) ** 2);
    }
    else {
        throw new Error('Inputs are not GeoJSON Points.');
    }
}
exports.distance = distance;
function bearing(origin, target) {
    validCoord(origin);
    validCoord(target);
    return ((radToDeg(Math.atan2(distanceEast(origin, target), distanceNorth(origin, target))) + 360) %
        360);
}
exports.bearing = bearing;
function pointNorthOf(origin, dN) {
    validCoord(origin);
    const lon = origin.coordinates[0];
    const lat = radToDeg(degToRad(origin.coordinates[1]) + dN / R1(origin));
    let result;
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        result = { coordinates: [lon, lat, h], type: 'Point' };
    }
    else {
        result = { coordinates: [lon, lat], type: 'Point' };
    }
    validCoord(result);
    return result;
}
exports.pointNorthOf = pointNorthOf;
function pointEastOf(origin, dE) {
    validCoord(origin);
    const lat = origin.coordinates[1];
    let lon = radToDeg(degToRad(origin.coordinates[0]) + dE / (R2(origin) * Math.cos(degToRad(lat))));
    if (lon > 180) {
        lon -= 360;
    }
    else if (lon < -180) {
        lon += 360;
    }
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        return { coordinates: [lon, lat, h], type: 'Point' };
    }
    else {
        return { coordinates: [lon, lat], type: 'Point' };
    }
}
exports.pointEastOf = pointEastOf;
function pointAbove(origin, dH) {
    validCoord(origin);
    return {
        coordinates: [origin.coordinates[0], origin.coordinates[1], origin.coordinates[2] + dH],
        type: 'Point'
    };
}
exports.pointAbove = pointAbove;
function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
function radToDeg(rad) {
    return (rad * 180) / Math.PI;
}
function validCoord(p) {
    if ((p.coordinates.length === 2 || p.coordinates.length === 3) &&
        -90 <= p.coordinates[1] &&
        p.coordinates[1] < 90 &&
        -180 <= p.coordinates[0] &&
        p.coordinates[0] <= 180) {
        return true;
    }
    else {
        throw new Error(`Invalid GeoJson or lat/lon out of range`);
    }
}
//# sourceMappingURL=index.js.map