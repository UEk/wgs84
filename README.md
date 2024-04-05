# wgs84

## Introduction

A tiny library fully implemented in Typescript to handle WGS84 coordinates in GeoJson and "small" distances between them with very high accuracy (~1 cm), based on a local, flat earth approximation.

-   All functions uses degrees for latitude and longitude, and meters for distances.
-   Parses and gives output in GeoJson using the [Point definition](https://en.wikipedia.org/wiki/GeoJSON). If you already have imported the typescript definition for Point in the geojson package you can use that (that is what I do in unit testing). Otherwise you can import `Point` from this package.
-   No dependencies to other NPM modules.
-   The math is based on [Aviation Formulary V1.47 by Ed Williams](https://edwilliams.org/avform147.htm#flat).
-   Functions will throw `Error` if fed impossible values, e.g. incorrectly formatted GeoJSON or lat >= 90 degrees (math will not work!). _Make sure to handle that!_

## Getting Started

Include in your project as any other NPM package

> npm install @ulrik.ek/wgs84

## Usage

```typescript
import * as wgs84 from '@ulrik.ek/wgs84'; // The functions can obviously also be imported separately

// helper function to construct a GeoJSON Point
const lat = 15;
const lon = 25;
const p: wgs84.Point = wgs84.point(lat, lon);

// Getting a new point 100m north and 200m east of the first point
const p1: wgs84.Point = wgs84.pointEastOf(wgs84.pointNorthOf(p, 300), 400);
const newLat = p1.coordinates[1]; // GeoJSON uses [lon, lat] order!
const newLon = p1.coordinates[0];
console.log(`lat=${newLat}, lon=${newLon}`);

// get the distance along north between the 2 points
console.log(`Distance along north=${wgs84.distanceNorth(p, p1)}`);
console.log(`Distance along east=${wgs84.distanceEast(p, p1)}`);
console.log(`Total distance=${wgs84.distance(p, p1)}`);
```

This will produce the following output

> lat=15.002711283642645, lon=25.003719230339353  
> Distance along north=300.00000000009265  
> Distance along east=400.00504064747975  
> Total distance=500.0040325271862

## Documention

The following functions are available:

```Typescript
point(lat: number, lon: number, height?: number): Point;
R1(position: Point): number;
R2(position: Point): number;
distanceNorth(origin: Point, target: Point): number;
distanceEast(origin: Point, target: Point): number;
distanceUp(origin: Point, target: Point): number;
distance(origin: Point, target: Point): number;
bearing(origin: Point, target: Point): number;
pointNorthOf(origin: Point, dN: number): Point;
pointEastOf(origin: Point, dE: number): Point;
pointAbove(origin: Point, dH: number): Point;
```

[Full Typedoc documentation](https://github.com/UEk/wgs84/blob/main/doc/modules.md)

# Build and Test

All functions are unit tested.
