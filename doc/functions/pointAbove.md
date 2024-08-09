[**@ulrik.ek/wgs84**](../README.md) • **Docs**

***

[@ulrik.ek/wgs84](../globals.md) / pointAbove

# Function: pointAbove()

> **pointAbove**(`origin`, `dH`): [`Point`](../interfaces/Point.md)

Gives a new point at a height dH above the current point
will throw for impossible input

## Parameters

• **origin**: [`Point`](../interfaces/Point.md)

the origin point in GeoJson

• **dH**: `number`

the distance up in meters, negative number gives a lower height

## Returns

[`Point`](../interfaces/Point.md)

GeoJson Point

## Defined in

[index.ts:203](https://github.com/UEk/wgs84/blob/115767c3576319ff56122f2199f41fb59f155d24/src/index.ts#L203)
