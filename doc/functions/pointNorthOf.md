[**micro-wgs84**](../README.md)

***

[micro-wgs84](../globals.md) / pointNorthOf

# Function: pointNorthOf()

> **pointNorthOf**(`origin`, `dN`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:172](https://github.com/UEk/wgs84/blob/3a41bc590be2ab8bfbb1ded3a3e979e491c2dcbe/src/index.ts#L172)

Gives a new point at a distance dN north of the current point
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### dN

`number`

the distance in meters along a northern meridian, negative number gives distance to south

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point
