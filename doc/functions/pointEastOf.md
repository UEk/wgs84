[**@ulrik.ek/wgs84**](../README.md) • **Docs**

***

[@ulrik.ek/wgs84](../globals.md) / pointEastOf

# Function: pointEastOf()

> **pointEastOf**(`origin`, `dE`): [`Point`](../interfaces/Point.md)

Gives a new point at a distance dE east of the current point
will throw for impossible input

## Parameters

• **origin**: [`Point`](../interfaces/Point.md)

the origin point in GeoJson

• **dE**: `number`

the distance in meters along an eastern meridian, negative number gives distance to west

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point

## Defined in

[index.ts:177](https://github.com/UEk/wgs84/blob/115767c3576319ff56122f2199f41fb59f155d24/src/index.ts#L177)
