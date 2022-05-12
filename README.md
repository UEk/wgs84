# wgs84

## Introduction

A tiny library fully implemented in Typescript to handle WGS84 coordinates in GeoJson and "small" distances between them with very high accuracy (~1 cm), based on a local, flat earth approximation.

-   Parses and gives output in GeoJson using the [Point definition](https://en.wikipedia.org/wiki/GeoJSON). If you already have imported the typescript definition for Point in the geojson package you can use that (that is what I do in unit testing). Otherwise you can import `Point` from this package.
-   No dependencies to other NPM modules.
-   The math is based on [Aviation Formulary V1.47 by Ed Williams](https://edwilliams.org/avform147.htm#flat).
-   Functions will throw `Error` if fed impossible values, e.g. incorrectly formatted GeoJSON or lat >= 90 degrees (math will not work!). _Make sure to handle that!_

## Getting Started

Include in your project as any other NPM package

> npm install @ulrik.ek/wgs84

## Usage

```typescript
import * as wgs84 from '@ulrik.ek/wgs84';

// helper function to construct a GeoJSON Point
const lat = 15;
const lon = 25;
const p: wgs84.Point = wgs84.point(lat, lon);

// Getting a new point 100m north and 200m east of the first point
const p1: wgs84.Point = wgs84.pointEastOf(wgs84.pointNorthOf(p, 100), 200);
const newLat = p1.coordinates[1]; // GeoJSON uses [lon, lat] order!
const newLon = p1.coordinates[0];
console.log(`lat=${newLat}, lon=${newLon}`);

// get the distance along north between the 2 points
console.log(`distance along north=${wgs84.distanceNorth(p, p1)}`);
console.log(`distance along east=${wgs84.distanceEast(p, p1)}`);
```

This will produce the following output

> lat=15.000903761214213, lon=25.001859599546577  
> distance along north=99.99999999991357  
> distance along east=200.00084005143466  

## Documention

[Typedoc](https://github.com/UEk/wgs84/blob/main/doc/modules.md)

# Build and Test

All functions are unit tested.
