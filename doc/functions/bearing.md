[**micro-wgs84**](../README.md)

***

[micro-wgs84](../globals.md) / bearing

# Function: bearing()

> **bearing**(`origin`, `target`): `number`

Defined in: [index.ts:41](https://github.com/UEk/wgs84/blob/3a41bc590be2ab8bfbb1ded3a3e979e491c2dcbe/src/index.ts#L41)

Calculates the bearing from origin to target in the plane
with 0 degrees being north, and 90 degrees being east
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### target

[`Point`](../interfaces/Point.md)

the target point in GeoJson

## Returns

`number`

degrees
