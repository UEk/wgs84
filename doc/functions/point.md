[**@ulrik.ek/wgs84**](../README.md) • **Docs**

***

[@ulrik.ek/wgs84](../globals.md) / point

# Function: point()

> **point**(`lat`, `lon`, `height`?): [`Point`](../interfaces/Point.md)

creates a GeoJSON Point
will throw for impossible input

## Parameters

• **lat**: `number`

in degrees, has to be -90 < lat < 90

• **lon**: `number`

in degrees, has to be -180 <= lon <= 180

• **height?**: `number`

in meters

## Returns

[`Point`](../interfaces/Point.md)

GeoJSON Point

## Defined in

[index.ts:18](https://github.com/UEk/wgs84/blob/7f15499841cff3193653ccb3eb4cdc78317fda40/src/index.ts#L18)
