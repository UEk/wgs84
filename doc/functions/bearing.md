[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / bearing

# Function: bearing()

> **bearing**(`origin`, `target`): `number`

Defined in: [index.ts:41](https://github.com/UEk/wgs84/blob/770e131198d296027838c31004a9cb9b904b9492/src/index.ts#L41)

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
