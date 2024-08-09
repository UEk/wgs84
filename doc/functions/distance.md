[**@ulrik.ek/wgs84**](../README.md) • **Docs**

***

[@ulrik.ek/wgs84](../globals.md) / distance

# Function: distance()

> **distance**(`origin`, `target`): `number`

Calculates the distance in meters between origin and target
Will take height into consideration, if given for both points
will throw for impossible input

## Parameters

• **origin**: [`Point`](../interfaces/Point.md)

the origin point in GeoJson

• **target**: [`Point`](../interfaces/Point.md)

the resulting point in GeoJson

## Returns

`number`

meters

## Defined in

[index.ts:116](https://github.com/UEk/wgs84/blob/115767c3576319ff56122f2199f41fb59f155d24/src/index.ts#L116)
