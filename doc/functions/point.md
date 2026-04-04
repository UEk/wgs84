[**@ulrik.ek/wgs84**](../README.md)

***

[@ulrik.ek/wgs84](../globals.md) / point

# Function: point()

> **point**(`lat`, `lon`, `height?`): [`Point`](../interfaces/Point.md)

Defined in: [index.ts:18](https://github.com/UEk/wgs84/blob/770e131198d296027838c31004a9cb9b904b9492/src/index.ts#L18)

creates a GeoJSON Point
will throw for impossible input

## Parameters

### lat

`number`

in degrees, has to be -90 < lat < 90

### lon

`number`

in degrees, has to be -180 <= lon <= 180

### height?

`number`

in meters

## Returns

[`Point`](../interfaces/Point.md)

GeoJSON Point
