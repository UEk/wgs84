export interface Point {
    type: 'Point';
    coordinates: number[];
}
export declare function point(lat: number, lon: number, height?: number): Point;
export declare function R1(position: Point): number;
export declare function R2(position: Point): number;
export declare function distanceNorth(origin: Point, target: Point): number;
export declare function distanceEast(origin: Point, target: Point): number;
export declare function distanceUp(origin: Point, target: Point): number;
export declare function distance(origin: Point, target: Point): number;
export declare function bearing(origin: Point, target: Point): number;
export declare function pointNorthOf(origin: Point, dN: number): Point;
export declare function pointEastOf(origin: Point, dE: number): Point;
export declare function pointAbove(origin: Point, dH: number): Point;
