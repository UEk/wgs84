export interface Point {
    type: 'Point';
    coordinates: number[];
}
export declare function R1(position: Point): number;
export declare function R2(position: Point): number;
export declare function distanceNorth(origin: Point, target: Point): number;
export declare function distanceEast(origin: Point, target: Point): number;
export declare function distanceUp(origin: Point, target: Point): number;
export declare function distance(origin: Point, target: Point): number;
export declare function bearing(origin: Point, target: Point): number;
export declare function pointNorth(origin: Point, dN: number): Point;
export declare function pointEast(origin: Point, dE: number): Point;
export declare function pointUp(origin: Point, dH: number): Point;
