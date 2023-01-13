# Robotics Notes
This is my quick reference sheet of information from EGR455/456, Robotics 1/2
 at ASU.



## Rotation Matrices
Where `c` is `cos(theta)` and `s` is `sin(theta)`.

Rotation about i axis:
```
      | 1 0 0 |
0R1 = | 0 c -s|
      | 0 s c |
```

Rotation about j axis:
```
      | c 0 s |
0R1 = | 0 1 0 |
      | -s 0 c|
```

Rotation about k axis:
```
      | c -s 0|
0R1 = | s c 0 |
      | 0 0 1 |
```

### Rules:
Finite rotations are not commutative:
```
Rx*Ry != Ry*Rx
```
However, at very small angles (where cos(theta) is close to 1, theta < 5 degrees), it is basically commutative.

Inverses:
```
(0R1)^-1=transpose(0R1)=1R0
```
Determinant:
```
Det(0R1) = 1
```
Multiplication:
```
0R1*1R2 = 0R2
```

# Coordinate Frames
With UAVs, they use the NED frame convention:
North - +X, towards the nose
East - +Y, towards the right wing
Down - +Z, pointing down

Positive angles follow the RH rule.

We assume the earth is also flat, and use the NED convention to represent our position on it. In this case, down points down into the earth.

GPS is referenced to earth center earth fixed (ECEF) frame.

## Frames
* Inertial frame: Fixed frame, fixed to the ground
* Vehicle frame: Fixed to the aircraft, in the same orientation as the inertial frame. Relative to the inertial frame, there is only translation, no rotation.
* Vehicle-1 frame: Vehicle frame, with yaw (Z axis) rotation applied. +Yaw is rotation to the right, given the NED conventions.
