[**micro-wgs84**](../README.md)

***

[micro-wgs84](../globals.md) / pointAbove

# Function: pointAbove()

> **pointAbove**(`origin`, `dH`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:131](https://github.com/UEk/wgs84/blob/3a41bc590be2ab8bfbb1ded3a3e979e491c2dcbe/src/index.ts#L131)

Gives a new point at a height dH above the current point
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### dH

`number`

the distance up in meters, negative number gives a lower height

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point
