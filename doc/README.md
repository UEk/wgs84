@ulrik.ek/wgs84 / [Exports](modules.md)

# @uek/wgs84

## Introduction

A tiny library fully implemented in Typescript to handle WGS84 coordinates in GeoJson and "small" distances between them with very high accuracy (~1 cm), based on a local, flat earth approximation.

-   Parses and gives output in GeoJson using the [Point definition](https://en.wikipedia.org/wiki/GeoJSON). If you already have imported the typescript definition for Point in the geojson package you can use that (that is what I do in unit testing). Otherwise you can import `Point` from this package.
-   No dependencies to other NPM modules.
-   The math is based on [Aviation Formulary V1.47 by Ed Williams](https://edwilliams.org/avform147.htm#flat).
-   Functions will throw `Error` if fed impossible values, e.g. incorrectly formatted GeoJSON or lat >= 90 degrees (math will not work!). Make sure to handle that!

## Getting Started

Include in your project as any other NPM package

> npm install @uek/wgs84

## Usage

```typescript
import {
    bearing,
    distance,
    distanceEast,
    distanceNorth,
    distanceUp,
    point,
    Point,
    pointEast,
    pointNorth,
    pointUp
} from '@UEk/wgs84';

// helper function to construct a GeoJSON Point
const lat = 15;
const lon = 25;
const p: Point = point(lat, lon);

// Getting a new point 100m north and 200m east of the first point
const p1: Point = pointEastOf(pointNorth(p, 100), 200);
const newLat = p1.coordinates[1]; // GeoJSON uses [lon, lat] order!
const newLon = p1.coordinates[0];

// get the distance along north between the 2 points
assert(distanceNorth(p, p1) === 100);
assert(distanceNorth(p1, p) === -100);
```

## Documention

[Typedoc](doc\)

# Build and Test

All functions are unit tested.