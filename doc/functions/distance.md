[**micro-wgs84**](../README.md)

***

[micro-wgs84](../globals.md) / distance

# Function: distance()

> **distance**(`origin`, `target`): `number`

Defined in: [index.ts:59](https://github.com/UEk/wgs84/blob/3a41bc590be2ab8bfbb1ded3a3e979e491c2dcbe/src/index.ts#L59)

Calculates the distance in meters between origin and target
Will take height into consideration, if given for both points
will throw for impossible input

## Parameters

### origin

[`Point`](../interfaces/Point.md)

the origin point in GeoJson

### target

[`Point`](../interfaces/Point.md)

the resulting point in GeoJson

## Returns

`number`

meters
