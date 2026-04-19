[**micro-wgs84**](../README.md)

***

[micro-wgs84](../globals.md) / pointEastOf

# Function: pointEastOf()

> **pointEastOf**(`origin`, `dE`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:146](https://github.com/UEk/wgs84/blob/3a41bc590be2ab8bfbb1ded3a3e979e491c2dcbe/src/index.ts#L146)

Gives a new point at a distance dE east of the current point
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### dE

`number`

the distance in meters along an eastern meridian, negative number gives distance to west

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point
