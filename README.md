# micro-wgs84

**Fast, lightweight, and precise flat-earth geodesy based on WGS84 and GeoJSON for TypeScript.**

[![npm version](https://img.shields.io/npm/v/micro-wgs84.svg)](https://www.npmjs.com/package/micro-wgs84)

## Why this library?

While general-purpose libraries are great for global calculations, they are often overkill and slower due to full spherical/ellipsoid mathematics.

This library is specialized for _local coordinates_ (e.g., within a city or a local site) using a flat-earth approximation. It offers _~1 cm accuracy_ for small distances while being significantly more performant.

### Key Features

- 🚀 **Ultra-fast:** Mathematical calculations based on [Ed Williams' Aviation Formulary](https://edwilliams.org/avform147.htm#flat).
- 🎯 **High Precision:** Accuracy down to ~1 cm for local approximations.
- 📦 **Zero Dependencies:** No bloat, tiny bundle size.
- 🔷 **TypeScript Native:** Built with TS 6.0, providing full type safety and GeoJSON `Point` compatibility.
- 🌐 **Modern ESM/CommonJS:** Works in Node.js, Browsers, Deno, and Edge functions.

## Installation

```bash
npm install micro-wgs84
```

## Usage

```typescript
import * as wgs84 from 'micro-wgs84';

// 1. Create points (lat, lon)
const p = wgs84.point(59.326634, 18.072837); // Royal castle, Stockholm

// 2. Project new coordinates
// Get a point 300m North and 400m East of origin
const p1: wgs84.Point = wgs84.pointEastOf(wgs84.pointNorthOf(p, 300), 400);
console.log(`lat=${p1.coordinates[1].toFixed(6)}, lon=${p1.coordinates[0].toFixed(6)}`); // GeoJSON uses [lon, lat] order!

// 3, Get the distance between the 2 points
console.log(`Total distance=${wgs84.distance(p, p1).toFixed(3)}m`);
```

This will produce the following output

> lat=59.329327, lon=18.079864
> 
> Total distance=500.025m

## API Documentation

The library provides a clean API for geometric operations. For the full technical details, see the [full documentation](https://github.com/UEk/wgs84/blob/main/doc/globals.md).

### Core Functions

- `point(lat, lon, height?)`: Helper to construct a GeoJSON Point.
- `distance(origin, target)`: Total distance between points in meters.
- `bearing(origin, target)`: Bearing between points in degrees.
- `distanceNorth / distanceEast / distanceUp`: Component distances.
- `pointNorthOf / pointEastOf / pointAbove`: Project new points based on offset in meters.

_Note that Points that are not valid (e.g. latitude > 90 degrees) will throw! Be sure to handle that!_

# Important Note on Accuracy

This library uses a flat-earth approximation. While accurate for "small" distances (within a few kilometers), the error margin increases as the distance between points grows. For global-scale calculations, a spherical model is recommended.

# Build and Test

All functions are fully unit-tested with Vitest.

# License

[MIT](./LICENSE)
