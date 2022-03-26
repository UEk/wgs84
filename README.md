# @UEk/wgs84

## Introduction

A tiny library fully implemented in Typescript to handle WGS84 coordinates and "small" distances in meters between them, based on a local, flat earth approximation.

-   Will parse and give output in GeoJSON if needed.
-   No dependencies to other NPM modules.
-   The math is based on [Aviation Formulary V1.47 by Ed Williams](https://edwilliams.org/avform147.htm#flat).
-   Functions and classes will throw if fed impossible values, e.g. lat >90 deg. Make sure to handle that!

## Getting Started

Include in your project as any other NPM package

> npm install @UEk/wgs84

## Usage

```typescript
import {
    distanceE,
    distanceN,
    distanceTotal,
    GeoJson,
    pointEast,
    pointNorth,
    pointUp,
    PointWGS84
} from '@UEk/wgs84';

const lat = 15;
const lon = 25;
const p: PointWGS84 = new PointWGS84(lat, lon);
// Getting a new point 100m  north and 200m east of the first point
const p1: PointWGS84 = pointEast(pointNorth(p, 100), 200);
const newLat = p1.lat;
const newLon = p1.lon;

// Same thing in GeoJSON
const p: PointWGS84 = PointWGS84.fromGeoJson({ coordinates: [25, 15], type: 'Point' });
const p1: GeoJson = pointEast(pointNorth(p, 100), 200).geoJson;
```

## Documention

[Typedoc](docs\index.html)

# Build and Test

All classes and functions are unit tested.
