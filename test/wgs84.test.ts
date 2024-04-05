// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import {
    bearing,
    distance,
    distanceEast,
    distanceNorth,
    distanceUp,
    point,
    pointAbove,
    pointEastOf,
    pointNorthOf,
    R1,
    R2
} from '../src/';

describe('My WGS84 GeoJson library should be able to create a GeoJSON Point', function toast() {
    test('only lat, lon', function toast() {
        const lat = 0;
        const lon = 20;
        const p: Point = point(lat, lon);
        expect(p.coordinates[0]).toBeCloseTo(lon, 6);
        expect(p.coordinates[1]).toBeCloseTo(lat, 6);
    });
    test('lat, lon, height', function toast() {
        const lat = 0;
        const lon = 20;
        const height = 33;
        const p: Point = point(lat, lon, height);
        expect(p.coordinates[0]).toBeCloseTo(lon, 6);
        expect(p.coordinates[1]).toBeCloseTo(lat, 6);
        expect(p.coordinates[2]).toBeCloseTo(height, 6);
    });
});
describe('My WGS84 GeoJson library should be able to calculate correct distances at the equator', function toast() {
    // distance of 1 second (1/60 of a degree) at the equator
    // See https://en.wikipedia.org/wiki/Latitude for length of a degree
    // 0deg	equals to N 110.574 km	E 111.320 km
    // origin
    const lat = 0;
    const lon = 20;
    const height = 33;
    const deltaN: number = (110.574 / 60) * 1000;
    const deltaE: number = (111.32 / 60) * 1000;
    // const p: PointWGS84 = new PointWGS84(lat, lon);
    const p: Point = { coordinates: [lon, lat, height], type: 'Point' };
    const delta: number = Math.sqrt((110.574 * 110.574) / 3600 + (111.32 * 111.32) / 3600) * 1000;

    test('1st quadrant North and east positive', function toast() {
        // const p1: = new PointWGS84(lat + 1 / 60, lon + 1 / 60);
        const p1: Point = { coordinates: [lon + 1 / 60, lat + 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p1)).toBeCloseTo(deltaN);
        expect(distanceEast(p, p1)).toBeCloseTo(deltaE, 1); // No cm precision...
        expect(distance(p, p1)).toBeCloseTo(delta);
        expect(bearing(p, p1)).toBeCloseTo(45, 0);
    });
    test('2nd quadrant, East positive, north negative', function toast() {
        // const p2 = new PointWGS84(lat - 1 / 60, lon + 1 / 60);
        const p2: Point = { coordinates: [lon + 1 / 60, lat - 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p2)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p2)).toBeCloseTo(deltaE, 1); // No cm precision...
        expect(distance(p, p2)).toBeCloseTo(delta);
        expect(bearing(p, p2)).toBeCloseTo(135, 0);
    });
    test('3rd quadrant, East and north negative', function toast() {
        // const p3 = new PointWGS84(lat - 1 / 60, lon - 1 / 60);
        const p3: Point = { coordinates: [lon - 1 / 60, lat - 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p3)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p3)).toBeCloseTo(-deltaE, 1); // No cm precision...
        expect(distance(p, p3)).toBeCloseTo(delta);
        expect(bearing(p, p3)).toBeCloseTo(225, 0);
    });
    test('4th quadrant, East negative and north positive', function toast() {
        // const p4 = new PointWGS84(lat + 1 / 60, lon - 1 / 60);
        const p4: Point = { coordinates: [lon - 1 / 60, lat + 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p4)).toBeCloseTo(deltaN);
        expect(distanceEast(p, p4)).toBeCloseTo(-deltaE, 1); // No cm precision...
        expect(distance(p, p4)).toBeCloseTo(delta);
        expect(bearing(p, p4)).toBeCloseTo(315, 0);
    });
    test('height', function toast() {
        const p5: Point = { coordinates: [20, 0, 55], type: 'Point' };
        expect(distanceUp(p, p5)).toBeCloseTo(22);
        expect(distance(p, p5)).toBeCloseTo(22);
    });
    test('at 180 deg longitude', function toast() {
        const p6: Point = { coordinates: [180 - 0.5 / 60, lat], type: 'Point' };
        const p7: Point = { coordinates: [-180 + 0.5 / 60, lat + 1 / 60], type: 'Point' };
        expect(distanceNorth(p6, p7)).toBeCloseTo(deltaN);
        expect(distanceEast(p6, p7)).toBeCloseTo(deltaE, 1); // No cm precision...
        expect(distance(p6, p7)).toBeCloseTo(delta);
        expect(bearing(p6, p7)).toBeCloseTo(45, 0);
        expect(distanceEast(p7, p6)).toBeCloseTo(-deltaE, 1); // No cm precision...
    });
});

describe('My WGS84 GeoJson library should be able to calculate correct distances at various latitudes', function toast() {
    // distance of 1 second (1/60 of a degree) at the equator
    // See https://en.wikipedia.org/wiki/Latitude for length of a degree
    // N60deg	111.412 km	55.800 km
    // origin
    const lat = 60;
    const lon = -30;
    const deltaN = (111.412 / 60) * 1000;
    const deltaE = (55.8 / 60) * 1000;
    // const p = new PointWGS84(lat, lon);
    const p: Point = { coordinates: [lon, lat], type: 'Point' };
    const delta = Math.sqrt((111.412 * 111.412) / 3600 + (55.8 * 55.8) / 3600) * 1000;

    test('1st quadrant North and east positive', function toast() {
        // const p1: = new PointWGS84(lat + 1 / 60, lon + 1 / 60);
        const p1: Point = { coordinates: [lon + 1 / 60, lat + 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p1)).toBeCloseTo(deltaN);
        expect(distanceEast(p, p1)).toBeCloseTo(deltaE, 1); // No cm precision...
        expect(distance(p, p1)).toBeCloseTo(delta);
    });
    test('2nd quadrant, East positive, north negative', function toast() {
        // const p2 = new PointWGS84(lat - 1 / 60, lon + 1 / 60);
        const p2: Point = { coordinates: [lon + 1 / 60, lat - 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p2)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p2)).toBeCloseTo(deltaE, 1); // No cm precision...
        expect(distance(p, p2)).toBeCloseTo(delta);
    });
    test('3rd quadrant, East and north negative', function toast() {
        // const p3 = new PointWGS84(lat - 1 / 60, lon - 1 / 60);
        const p3: Point = { coordinates: [lon - 1 / 60, lat - 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p3)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p3)).toBeCloseTo(-deltaE, 1); // No cm precision...
        expect(distance(p, p3)).toBeCloseTo(delta);
    });
    test('4th quadrant, East negative and north positive', function toast() {
        // const p4 = new PointWGS84(lat + 1 / 60, lon - 1 / 60);
        const p4: Point = { coordinates: [lon - 1 / 60, lat + 1 / 60], type: 'Point' };
        expect(distanceNorth(p, p4)).toBeCloseTo(deltaN);
        expect(distanceEast(p, p4)).toBeCloseTo(-deltaE, 1); // No cm precision...
        expect(distance(p, p4)).toBeCloseTo(delta);
    });
    test('should be able to calculate the distance at 30 degrees south', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // S30 deg	110.852 km	96.486 km
        // origin
        const lat = -30;
        const lon = 30;
        const deltaN = (110.852 * 1000) / (60 * 60); // Distance of 1 second approx 30 m
        const deltaE = (96.486 * 1000) / (60 * 60);
        const p: Point = { coordinates: [lon, lat], type: 'Point' };
        const delta = Math.hypot(deltaN, deltaE);

        // 3rd quadrant, East and north negative
        const p3: Point = {
            coordinates: [lon - 1 / (60 * 60), lat - 1 / (60 * 60)],
            type: 'Point'
        };

        expect(distanceNorth(p, p3)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p3)).toBeCloseTo(-deltaE);
        expect(distance(p, p3)).toBeCloseTo(delta);
    });
    test('should be able to calculate the distance at 30 degrees south with height', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // S30 deg	110.852 km	96.486 km
        // origin
        const lat = -30;
        const lon = 30;
        const deltaN = (110.852 * 1000) / (60 * 60); // Distance of 1 second approx 30 m
        const deltaE = (96.486 * 1000) / (60 * 60);
        const deltaH = 80;
        const p: Point = { coordinates: [lon, lat, 10], type: 'Point' };
        const delta = Math.hypot(deltaN, deltaE, deltaH);

        // 3rd quadrant, East and north negative
        const p3: Point = {
            coordinates: [lon - 1 / (60 * 60), lat - 1 / (60 * 60), 90],
            type: 'Point'
        };
        expect(distanceNorth(p, p3)).toBeCloseTo(-deltaN);
        expect(distanceEast(p, p3)).toBeCloseTo(-deltaE);
        expect(distance(p, p3)).toBeCloseTo(delta);
    });
    test('should be able to calculate a longer distance at 55 deg North', function toast() {
        // Test the distance from Ulrik's home to work
        // Home
        // const p1 = new PointWGS84(55.5, 13.6, 65.5);
        const p1: Point = { coordinates: [13.6, 55.5, 65.5], type: 'Point' };
        // Work = ADB Safegate
        // const p2 = new PointWGS84(55.6, 13, 45);
        const p2: Point = { coordinates: [13, 55.6, 45], type: 'Point' };
        // Travel west to work
        expect(distanceEast(p1, p2) / 1000).toBeCloseTo(-38, 0);
        // Travel north to work
        expect(distanceNorth(p1, p2) / 1000).toBeCloseTo(11, 0);
    });
});

describe('My WGS84 GeoJson library should be able to calculate new positions', function toast() {
    test('to the north or east of an existing position', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m north is equal to 1/(110.649*10) deg
        // origin
        const lat = 15;
        const lon = 25;
        // const p = new PointWGS84(lat, lon);
        const p: Point = { coordinates: [lon, lat], type: 'Point' };
        const deltaN = 100;
        const deltaE = 200;
        const p1: Point = pointEastOf(pointNorthOf(p, deltaN), deltaE);
        expect(p1).toBeDefined();
        expect(p1.coordinates[1]).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p1.coordinates[0]).toBeCloseTo(lon + 0.2 / 107.55, 6);
    });
    test('to the north or east of an existing position with height', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m north is equal to 1/(110.649*10) deg
        // origin
        const lat = 15;
        const lon = 25;
        const height = 550;
        // const p = new PointWGS84(lat, lon);
        const p: Point = { coordinates: [lon, lat, height], type: 'Point' };
        const deltaN = 100;
        const deltaE = 200;
        const deltaH = 80;
        const p1: Point = pointAbove(pointEastOf(pointNorthOf(p, deltaN), deltaE), deltaH);
        expect(p1).toBeDefined();
        expect(p1.coordinates[1]).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p1.coordinates[0]).toBeCloseTo(lon + 0.2 / 107.55, 6);
        expect(p1.coordinates[2]).toBeCloseTo(630);
    });
    test('above an existing position', function toast() {
        const lat = 11;
        const lon = 22;
        const height = 33;
        // const p = new PointWGS84(lat, lon, height);
        const p: Point = { coordinates: [lon, lat, height], type: 'Point' };
        const deltaH = 100;
        const p1: Point = pointAbove(p, deltaH);
        expect(p1).toBeDefined();
        expect(p1.coordinates[1]).toBeCloseTo(lat, 6);
        expect(p1.coordinates[0]).toBeCloseTo(lon, 6);
        expect(p1.coordinates[2]).toBeCloseTo(133);
    });
    test('that the transitions in distanceX() functions are approximately transmutative', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m north is equal to 1/(110.649*10) deg
        // origin
        const lat = 15;
        const lon = 25;
        const height = 550;
        // const p = new PointWGS84(lat, lon);
        const p: Point = { coordinates: [lon, lat, height], type: 'Point' };
        const deltaN = 100;
        const deltaE = 200;
        const deltaH = 80;
        const p2: Point = pointNorthOf(pointEastOf(pointAbove(p, deltaH), deltaE), deltaN);
        const p3: Point = pointAbove(pointEastOf(pointNorthOf(p, deltaN), deltaE), deltaH);
        expect(p2.coordinates[0]).toBeCloseTo(p3.coordinates[0], 7);
        expect(p2.coordinates[1]).toBeCloseTo(p3.coordinates[1], 7);
        expect(p2.coordinates[2]).toBeCloseTo(p3.coordinates[2], 7);
    });
    test('to the east of an existing position at 180 degrees', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m east is equal to 1/(107.55) deg
        // origin
        const deltaDeg = 1 / (107.55 * 10);
        const lat = 15;
        const lon = 180;
        // const p = new PointWGS84(lat, lon);
        const p: Point = { coordinates: [lon - deltaDeg, lat], type: 'Point' };
        const deltaN = 100;
        const deltaE = 200;
        const p1: Point = pointEastOf(pointNorthOf(p, deltaN), deltaE);
        expect(p1).toBeDefined();
        expect(p1.coordinates[1]).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p1.coordinates[0]).toBeCloseTo(-lon + 0.1 / 107.55, 6);
    });
    test('to the west of an existing position at -180 degrees', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m east is equal to 1/(107.55) deg
        // origin
        const deltaDeg = 1 / (107.55 * 10);
        const lat = 15;
        const lon = 180;
        // const p = new PointWGS84(lat, lon);
        const p: Point = { coordinates: [-lon + deltaDeg, lat], type: 'Point' };
        const deltaN = 100;
        const deltaE = -200;
        const p1: Point = pointEastOf(pointNorthOf(p, deltaN), deltaE);
        expect(p1).toBeDefined();
        expect(p1.coordinates[1]).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p1.coordinates[0]).toBeCloseTo(lon - 0.1 / 107.55, 6);
    });
});

describe('My WGS84 GeoJson library should throw if given incorrect inputs', function toast() {
    const lat = 0;
    const lon = 20;
    const height = 33;
    const p: Point = { coordinates: [lon, lat, height], type: 'Point' };

    test('distanceUp should throw if point does not have height', function toast() {
        const p1: Point = { coordinates: [20, 0], type: 'Point' };
        expect(() => {
            distanceUp(p, p1);
        }).toThrow();
    });
    test('distance should throw if given invalid coordinates for GeoJson Point', function toast() {
        const p1: Point = { coordinates: [20], type: 'Point' };
        expect(() => {
            distance(p, p1);
        }).toThrow();
    });
    test('distance should throw if lat > 90 degrees', function toast() {
        const p1: Point = { coordinates: [15, 92], type: 'Point' };
        expect(() => {
            distance(p, p1);
        }).toThrow('out of range');
    });
    test('point should throw if latitude > 90 degrees', function toast() {
        expect(() => {
            point(92, 15, 20);
        }).toThrow('out of range');
    });
    test('point should throw if longitude > 180 degrees', function toast() {
        expect(() => {
            point(22, 182, 20);
        }).toThrow('out of range');
    });
    test('pointNorthOf should throw if new lat > 90', function toast() {
        const p1: Point = { coordinates: [0, 89.99], type: 'Point' };
        expect(() => {
            pointNorthOf(p1, 2000);
        }).toThrow();
    });
    test('R1 should throw if lat > 90 degrees', function toast() {
        const p1: Point = { coordinates: [15, 92], type: 'Point' };
        expect(() => {
            R1(p1);
        }).toThrow('out of range');
    });
    test('R2 should throw if lat > 90 degrees', function toast() {
        const p2: Point = { coordinates: [15, 92], type: 'Point' };
        expect(() => {
            R2(p2);
        }).toThrow('out of range');
    });
});
