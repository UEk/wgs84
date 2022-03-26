import {
    distanceE,
    distanceN,
    distanceTotal,
    GeoJson,
    pointEast,
    pointNorth,
    pointUp,
    PointWGS84
} from '../src';

describe('My WGS84 library', function toast() {
    describe('should be able to have a correct constructors and accessors', function toast() {
        test('0N, 0E', function toast() {
            const p: PointWGS84 = new PointWGS84(0, 0, 0);
            expect(p).toBeDefined();
            expect(p.lat).toBe(0);
            expect(p.lon).toBe(0);
            expect(p.height).toBe(0);
        });
        test('55.560482N, 13.071360E', function toast() {
            // Constructor without height
            const q: PointWGS84 = new PointWGS84(55.560_482, 13.071_36);
            expect(q.lat).toBeCloseTo(55.560_482);
            expect(q.lon).toBeCloseTo(13.071_36);
            expect(q.height).toBe(0);
        });
        test('10.0N, 20.0E, 30m', function toast() {
            const r: PointWGS84 = new PointWGS84(10, 20, 30);
            expect(r.lat).toBe(10);
            expect(r.lon).toBe(20);
            expect(r.height).toBe(30);
        });
        test('92.0N, 20.0E, 30m should throw', function toast() {
            expect(() => {
                new PointWGS84(92, 20, 30);
            }).toThrow();
        });
        test('10.0N, 181.0W, 30m should throw', function toast() {
            expect(() => {
                new PointWGS84(10, 181, 30);
            }).toThrow();
        });
    });

    describe('should be able to calculate correct distances at the equator', function toast() {
        // distance of 1 second (1/60 of a degree) at the equator
        // See https://en.wikipedia.org/wiki/Latitude for length of a degree
        // 0deg	equals to N 110.574 km	E 111.320 km
        // origin
        const lat = 0;
        const lon = 20;
        const dN: number = (110.574 / 60) * 1000;
        const dE: number = (111.32 / 60) * 1000;
        const p: PointWGS84 = new PointWGS84(lat, lon);
        const d: number = Math.sqrt((110.574 * 110.574) / 3600 + (111.32 * 111.32) / 3600) * 1000;

        test('1st quadrant North and east positive', function toast() {
            const p1: PointWGS84 = new PointWGS84(lat + 1 / 60, lon + 1 / 60);
            expect(distanceN(p, p1)).toBeCloseTo(dN);
            expect(distanceE(p, p1)).toBeCloseTo(dE, 1); // No cm precision...
            expect(distanceTotal(p, p1)).toBeCloseTo(d);
        });
        test('2nd quadrant, East positive, north negative', function toast() {
            const p2 = new PointWGS84(lat - 1 / 60, lon + 1 / 60);
            expect(distanceN(p, p2)).toBeCloseTo(-dN);
            expect(distanceE(p, p2)).toBeCloseTo(dE, 1); // No cm precision...
            expect(distanceTotal(p, p2)).toBeCloseTo(d);
        });

        test('3rd quadrant, East and north negative', function toast() {
            const p3 = new PointWGS84(lat - 1 / 60, lon - 1 / 60);
            expect(distanceN(p, p3)).toBeCloseTo(-dN);
            expect(distanceE(p, p3)).toBeCloseTo(-dE, 1); // No cm precision...
            expect(distanceTotal(p, p3)).toBeCloseTo(d);
        });
        test('4th quadrant, East negative and north positive', function toast() {
            const p4 = new PointWGS84(lat + 1 / 60, lon - 1 / 60);
            expect(distanceN(p, p4)).toBeCloseTo(dN);
            expect(distanceE(p, p4)).toBeCloseTo(-dE, 1); // No cm precision...
            expect(distanceTotal(p, p4)).toBeCloseTo(d);
        });
    });

    describe('should be able to calculate correct distances at 60 deg North', function toast() {
        // distance of 1 second (1/60 of a degree) at the equator
        // See https://en.wikipedia.org/wiki/Latitude for length of a degree
        // N60deg	111.412 km	55.800 km
        // origin
        const lat = 60;
        const lon = -30;
        const dN = (111.412 / 60) * 1000;
        const dE = (55.8 / 60) * 1000;
        const p = new PointWGS84(lat, lon);
        const d = Math.sqrt((111.412 * 111.412) / 3600 + (55.8 * 55.8) / 3600) * 1000;

        test('1st quadrant North and east positive', function toast() {
            const p1 = new PointWGS84(lat + 1 / 60, lon + 1 / 60);
            expect(distanceN(p, p1)).toBeCloseTo(dN);
            expect(distanceE(p, p1)).toBeCloseTo(dE);
            expect(distanceTotal(p, p1)).toBeCloseTo(d);
        });
        test('2nd quadrant, East positive, north negative', function toast() {
            const p2 = new PointWGS84(lat - 1 / 60, lon + 1 / 60);
            expect(distanceN(p, p2)).toBeCloseTo(-dN);
            expect(distanceE(p, p2)).toBeCloseTo(dE);
            expect(distanceTotal(p, p2)).toBeCloseTo(d);
        });
        test('3rd quadrant, East and north negative', function toast() {
            const p3 = new PointWGS84(lat - 1 / 60, lon - 1 / 60);
            expect(distanceN(p, p3)).toBeCloseTo(-dN);
            expect(distanceE(p, p3)).toBeCloseTo(-dE);
            expect(distanceTotal(p, p3)).toBeCloseTo(d);
        });
        test('4th quadrant, East negative and north positive', function toast() {
            const p4 = new PointWGS84(lat + 1 / 60, lon - 1 / 60);
            expect(distanceN(p, p4)).toBeCloseTo(dN);
            expect(distanceE(p, p4)).toBeCloseTo(-dE);
            expect(distanceTotal(p, p4)).toBeCloseTo(d);
        });
    });

    test('should be able to calculate the distance at 30 degrees south', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // S30 deg	110.852 km	96.486 km
        // origin
        const lat = -30;
        const lon = 30;
        const dN = (110.852 * 1000) / (60 * 60); // Distance of 1 second approx 30 m
        const dE = (96.486 * 1000) / (60 * 60);
        const p = new PointWGS84(lat, lon);
        const d = Math.sqrt(dN * dN + dE * dE);

        // 3rd quadrant, East and north negative
        const p3 = new PointWGS84(lat - 1 / (60 * 60), lon - 1 / (60 * 60));
        expect(distanceN(p, p3)).toBeCloseTo(-dN);
        expect(distanceE(p, p3)).toBeCloseTo(-dE);
        expect(distanceTotal(p, p3)).toBeCloseTo(d);
    });

    test('should be able to calculate a longer distance at 55 deg North', function toast() {
        // Test the distance from Ulrik's home to work
        // Home
        const p1 = new PointWGS84(55.5, 13.6, 65.5);
        // Work = ADB Safegate
        const p2 = new PointWGS84(55.6, 13, 45);

        // Travel west to work
        expect(distanceE(p1, p2) / 1000).toBeCloseTo(-38, 0);
        // Travel north to work
        expect(distanceN(p1, p2) / 1000).toBeCloseTo(11, 0);
    });

    test('should be able to calculate new positions to the north or east of an existing position', function toast() {
        // distance of 1 second (1/60 of a degree) at N30
        // See https://en.wikipedia.org/wiki/Latitude for lengt of a degree
        // 15°	110.649 km	107.550 km
        // so 100 m north is equal to 1/(110.649*10) deg
        // origin
        const lat = 15;
        const lon = 25;
        const p = new PointWGS84(lat, lon);
        const dN = 100;
        const dE = 200;
        const p1: PointWGS84 = pointEast(pointNorth(p, dN), dE);
        expect(p1).toBeDefined();
        expect(p1.lat).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p1.lon).toBeCloseTo(lon + 0.2 / 107.55, 6);
        // Checking that the point functions are transmutative
        const p2 = pointNorth(pointEast(p, dE), dN);
        expect(p2.lat).toBeCloseTo(lat + 0.1 / 110.649, 6);
        expect(p2.lon).toBeCloseTo(lon + 0.2 / 107.55, 6);
    });

    test('should be able to calculate new positions above an existing position', function toast() {
        const lat = 11;
        const lon = 22;
        const height = 33;
        const p = new PointWGS84(lat, lon, height);
        const dH = 100;
        const p1: PointWGS84 = pointUp(p, dH);
        expect(p1).toBeDefined();
        expect(p1.lat).toBeCloseTo(lat, 6);
        expect(p1.lon).toBeCloseTo(lon, 6);
        expect(p1.height).toBeCloseTo(133);
    });

    describe('should be able to parse GeoJSON positions', function toast() {
        test('45.N, 100.0E, Note that GeoJSON uses order of lon, lat', function toast() {
            const x: GeoJson = { coordinates: [100, 45], type: 'Point' };
            const p: PointWGS84 = PointWGS84.fromGeoJson(x);

            expect(p).toBeDefined();
            expect(p.lat).toBe(45);
            expect(p.lon).toBe(100);
            expect(p.height).toBe(0);

            expect(p.geoJson.type).toBe('Point');
            expect(p.geoJson.coordinates[0]).toBe(100); // longitude
            expect(p.geoJson.coordinates[1]).toBe(45); // latitude

            expect(p.geoJson.coordinates[2]).toBe(0); // height
        });
        test('25.N, 45.0E, Note that GeoJSON uses order of lon, lat', function toast() {
            const x: GeoJson = { coordinates: [100, 45], type: 'Point' };
            const p: PointWGS84 = PointWGS84.fromGeoJson(x);
            const p1: GeoJson = pointEast(pointNorth(p, 100), 200).geoJson;
            expect(p1).toBeDefined();
            expect(p1.coordinates[1]).toBeCloseTo(45);
            expect(p1.coordinates[0]).toBeCloseTo(100);
            expect(p.height).toBe(0);
        });
        test('55.0N, 85.0E, 12m, Note that GeoJSON uses order of lon, lat', function toast() {
            const y: GeoJson = { coordinates: [85, 55, 12], type: 'Point' };
            const q = PointWGS84.fromGeoJson(y);

            expect(q).toBeDefined();
            expect(q.lat).toBe(55);
            expect(q.lon).toBe(85);
            expect(q.height).toBe(12);

            expect(q.geoJson.type).toBe('Point');
            expect(q.geoJson.coordinates[0]).toBe(85); // longitude
            expect(q.geoJson.coordinates[1]).toBe(55); // latitude
            expect(q.geoJson.coordinates[2]).toBe(12); // height
        });
        test('85E to throw', function toast() {
            const y = { coordinates: [85], type: 'Point' };
            expect(() => {
                const p = PointWGS84.fromGeoJson(y);
            }).toThrow();
        });
        test('4 coordinates to throw', function toast() {
            const y = { coordinates: [85, 85, 85, 85], type: 'Point' };
            expect(() => {
                const p = PointWGS84.fromGeoJson(y);
            }).toThrow();
        });
        test('lowercase GeJson "point"', function toast() {
            const y = { coordinates: [85, 55, 12], type: 'point' };
            const q = PointWGS84.fromGeoJson(y);
            expect(q).toBeDefined();
        });
    });
});
