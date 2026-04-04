[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / pointNorthOf

# Function: pointNorthOf()

> **pointNorthOf**(`origin`, `dN`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:172](https://github.com/UEk/wgs84/blob/770e131198d296027838c31004a9cb9b904b9492/src/index.ts#L172)

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
