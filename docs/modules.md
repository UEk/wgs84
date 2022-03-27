[@UEk/wgs84](README.md) / Exports

# @UEk/wgs84

## Table of contents

### Interfaces

- [Point](interfaces/Point.md)

### Functions

- [R1](modules.md#r1)
- [R2](modules.md#r2)
- [bearing](modules.md#bearing)
- [distance](modules.md#distance)
- [distanceEast](modules.md#distanceeast)
- [distanceNorth](modules.md#distancenorth)
- [distanceUp](modules.md#distanceup)
- [point](modules.md#point)
- [pointEast](modules.md#pointeast)
- [pointNorth](modules.md#pointnorth)
- [pointUp](modules.md#pointup)

## Functions

### R1

▸ **R1**(`position`): `number`

The meridional radius of curvature at a certain geographical position
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Point`](interfaces/Point.md) | The current position |

#### Returns

`number`

meters

#### Defined in

[index.ts:41](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L41)

___

### R2

▸ **R2**(`position`): `number`

The radius of curvature in the prime vertical at a certain geographical position
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | [`Point`](interfaces/Point.md) | The current position |

#### Returns

`number`

meters

#### Defined in

[index.ts:53](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L53)

___

### bearing

▸ **bearing**(`origin`, `target`): `number`

Calculates the bearing from origin to target in the plane
with 0 degrees being north, and 90 degrees being east
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `target` | [`Point`](interfaces/Point.md) | the target point |

#### Returns

`number`

degrees

#### Defined in

[index.ts:134](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L134)

___

### distance

▸ **distance**(`origin`, `target`): `number`

Calculates the distance in meters between origin and target
Will take height into consideration, if given for both points
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `target` | [`Point`](interfaces/Point.md) | the resulting point |

#### Returns

`number`

meters

#### Defined in

[index.ts:112](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L112)

___

### distanceEast

▸ **distanceEast**(`origin`, `target`): `number`

Calculates the distance in meters along an eastern meridian
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:81](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L81)

___

### distanceNorth

▸ **distanceNorth**(`origin`, `target`): `number`

Calculates the distance in meters along a northern meridian
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:66](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L66)

___

### distanceUp

▸ **distanceUp**(`origin`, `target`): `number`

Calculates the vertical distance in meters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the starting point |
| `target` | [`Point`](interfaces/Point.md) | the ending point |

#### Returns

`number`

meters

#### Defined in

[index.ts:96](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L96)

___

### point

▸ **point**(`lat`, `lon`, `height?`): [`Point`](interfaces/Point.md)

creates a GeoJSON Point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lat` | `number` | in degrees, has to be -90 < lat < 90 |
| `lon` | `number` | in degrees, has to be -180 <= lon < 180 |
| `height?` | `number` | in meters |

#### Returns

[`Point`](interfaces/Point.md)

GeoJSON Point

#### Defined in

[index.ts:18](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L18)

___

### pointEast

▸ **pointEast**(`origin`, `dE`): [`Point`](interfaces/Point.md)

Gives a new point at a distance dE east of the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dE` | `number` | the distance along an eastern meridian, negative number gives distance to west |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:170](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L170)

___

### pointNorth

▸ **pointNorth**(`origin`, `dN`): [`Point`](interfaces/Point.md)

Gives a new point at a distance dN north of the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dN` | `number` | the distance along a northern meridian, negative number gives distance to south |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:151](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L151)

___

### pointUp

▸ **pointUp**(`origin`, `dH`): [`Point`](interfaces/Point.md)

Gives a new point at a distance dE east of the current point
will throw for impossible input

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`Point`](interfaces/Point.md) | the origin point |
| `dH` | `number` | the distance up in meters, negative number gives a lower height |

#### Returns

[`Point`](interfaces/Point.md)

#### Defined in

[index.ts:191](https://github.com/UEk/wgs84/blob/b1aa4e9/src/index.ts#L191)
