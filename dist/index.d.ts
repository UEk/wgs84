export declare type GeoJson = {
    type: string;
    coordinates: number[];
};
export declare class PointWGS84 {
    private readonly myLatInRad;
    private readonly myLonInRad;
    private readonly myHeightInM;
    private readonly R;
    private readonly f;
    private readonly eSquared;
    private readonly myR1;
    private readonly myR2;
    constructor(lat: number, lon: number, height?: number);
    static fromGeoJson(x: GeoJson): PointWGS84;
    get lon(): number;
    get lat(): number;
    get lonInRad(): number;
    get latInRad(): number;
    get height(): number;
    get R1(): number;
    get R2(): number;
    get geoJson(): GeoJson;
}
export declare function distanceN(x: PointWGS84, y: PointWGS84): number;
export declare function distanceE(x: PointWGS84, y: PointWGS84): number;
export declare function distanceTotal(x: PointWGS84, y: PointWGS84): number;
export declare function pointNorth(x: PointWGS84, dN: number): PointWGS84;
export declare function pointEast(x: PointWGS84, dE: number): PointWGS84;
export declare function pointUp(x: PointWGS84, dH: number): PointWGS84;
