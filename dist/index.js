"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointUp = exports.pointEast = exports.pointNorth = exports.bearing = exports.distance = exports.distanceUp = exports.distanceEast = exports.distanceNorth = exports.R2 = exports.R1 = void 0;
const R = 6378.137 * 1000;
const f = 1 / 298.257223563;
const eSquared = f * (2 - f);
function R1(position) {
    const lat = degToRad(position.coordinates[1]);
    return (R * (1 - eSquared)) / Math.pow(1 - eSquared * Math.pow(Math.sin(lat), 2), 3 / 2);
}
exports.R1 = R1;
function R2(position) {
    const lat = degToRad(position.coordinates[1]);
    return R / Math.sqrt(1 - eSquared * Math.pow(Math.sin(lat), 2));
}
exports.R2 = R2;
function distanceNorth(origin, target) {
    const xLat = degToRad(origin.coordinates[1]);
    const yLat = degToRad(target.coordinates[1]);
    return R1(origin) * (yLat - xLat);
}
exports.distanceNorth = distanceNorth;
function distanceEast(origin, target) {
    const xLat = degToRad(origin.coordinates[1]);
    const xLon = degToRad(origin.coordinates[0]);
    const yLon = degToRad(target.coordinates[0]);
    return R2(origin) * Math.cos(xLat) * (yLon - xLon);
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
        return Math.sqrt(distanceNorth(origin, target) ** 2 + distanceEast(origin, target) ** 2 + distanceUp(origin, target) ** 2);
    }
    else {
        throw new Error('Inputs are not GeoJSON Points.');
    }
}
exports.distance = distance;
function bearing(origin, target) {
    return (radToDeg(Math.atan2(distanceEast(origin, target), distanceNorth(origin, target))) + 360) % 360;
}
exports.bearing = bearing;
function pointNorth(origin, dN) {
    const lat = radToDeg(degToRad(origin.coordinates[1]) + dN / R1(origin));
    const lon = origin.coordinates[0];
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        return { coordinates: [lon, lat, h], type: 'Point' };
    }
    else {
        return { coordinates: [lon, lat], type: 'Point' };
    }
}
exports.pointNorth = pointNorth;
function pointEast(origin, dE) {
    const lat = origin.coordinates[1];
    const lon = radToDeg(degToRad(origin.coordinates[0]) + dE / (R2(origin) * Math.cos(degToRad(lat))));
    if (origin.coordinates[2]) {
        const h = origin.coordinates[2];
        return { coordinates: [lon, lat, h], type: 'Point' };
    }
    else {
        return { coordinates: [lon, lat], type: 'Point' };
    }
}
exports.pointEast = pointEast;
function pointUp(origin, dH) {
    return {
        coordinates: [origin.coordinates[0], origin.coordinates[1], origin.coordinates[2] + dH],
        type: 'Point'
    };
}
exports.pointUp = pointUp;
function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
function radToDeg(rad) {
    return (rad * 180) / Math.PI;
}
//# sourceMappingURL=index.js.map