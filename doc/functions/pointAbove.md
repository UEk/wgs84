[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / pointAbove

# Function: pointAbove()

> **pointAbove**(`origin`, `dH`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:131](https://github.com/UEk/wgs84/blob/e8e4bbfd1d8ff81410dce1ae7afe5436fa6e0608/src/index.ts#L131)

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
