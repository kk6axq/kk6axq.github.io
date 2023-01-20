---
title: Robotics Notes
---
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
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
* Vehicle frame: Fixed to the aircraft, in the same orientation as the inertial frame. Relative to the inertial frame, there is only pure translation, no rotation.
* Vehicle-1 frame: Vehicle frame, with yaw (Z axis) rotation applied. +Yaw is rotation to the right, given the NED conventions.
* Vehicle-2 frame: Vehicle-1 frame, with pitch (Y axis) rotation applied. +Pitch is rotation up.
* Body frame: Vehicle-2 frame, with roll (X axis) rotation applied. +Roll is rotation to the right.

So the chain is:
```
          Translation     Yaw         Pitch        Roll
Inertial frame -> Vehicle -> Vehicle-1 -> Vehicle-2 -> Body frame
                           Z           Y             X
```

The body frame is the final position and orientation of the vehicle in the global frame.

An example is a strapped inertial navigation system. The IMU records roll,
pitch, and yaw in the body frame, this has to be transformed back into the
inertial frame to find the position in global space.

### Airspeed
Airspeed is not in any of these frames, it's in a wind frame.

The airspeed vector points in some direction relative to the body axis. The
projection of the airspeed vector on the body's `ik` plane forms the `i`
axis of the **stability** frame. This axis is rotated &alpha; degrees around the `j` axis of the body frame, forming the angle of attack. The angle &alpha; is measured from the `i`<sub>`stability`</sub> axis to the `i`<sub>`body`</sub> axis. **Note**: Rotation between the body and stability frame necessitates a right hand rotation about `j`<sub>`body`</sub>. Between body and stability frames, the `j` axes both point the same direction, it's just a rotation about `j`.

The projection of the airspeed vector on the stability frame's `ij` plane forms the `j`<sub>`wind`</sub> axis. The angle formed between `j`<sub>`wind`</sub> and `j`<sub>`stability`</sub> is &beta;. &beta; is the sideslip angle. Unlike &alpha; this is a normal rotation about the `k` axis, so the rotation does not need to be reversed. Between the stability and wind axes, the `k` axes both point the same direction, it's just a rotation about `k`.

**Remember:** The wind to stability frame shows the &beta; rotation, for sideslip. The stability to vehicle frame shows the &alpha; rotation, for angle of attack.


## Frame variables
* &psi; (Psi) is used to represent the heading (yaw) angle.
* &Theta; (Theta) is used to represent the elevation (pitch) angle.

* &Phi; (Phi) is used to represent bank (roll) angle.

With euler angles, there is a mathematical singularity at 90 degrees (gimbal
 lock).
Quaternions do not have this singularity, and thus are more robust, albeit more
complex. Quaternions are also easier to forward and back propagate.


## Wind and airspeed, groundspeed.

V<sub>g</sub> is the groundspeed vector. This is the direction of movement of the vehicle in the inertial frame. Vector vg expresses this as the movement of the aircraft with regards to the inertial frame, expressed in the body frame.

`Vbg = (u;v;w)`

V<sub>w</sub> is the wind vector. This is the movement of the wind relative to the inertial frame, expressed in the body frame.

`Vbw = (uw;vw;ww)=Rbv(Φ, Θ, ψ)(wn;we;wd)`

The aircraft's velocity described in the wind frame is quite simple:
`Vwa = (Va;0;0)`

This is because the transform to wind frame already removes any angle of attack or sideslip angle, resulting in only a linear airspeed component along the `i` axis.

Groundspeed is a function of both airspeed and wind speed, as seen by the following equation:
V<sub>g</sub>=V<sub>a</sub>+V<sub>w</sub>

The actual airspeed is ground speed minus the wind speed vectors. If you're going into a headwind, you'll move slower both in total airspeed and groundspeed.

The final relation is the expression of aircraft movement relative to the surrounding air, as expressed in the body frame:
`Vba = (ur;vr;wr;)=Va * (cos(α)cos(β); sin(β); sin(α)cos(β))`

This allows one to calculate alpha and beta:

α = tan-1(wr/ur)

β=sin-1(vr/(ur^2+vr^2+wr^2)^0.5)

## Course and flight path angles
&Chi; (Chi) is the course angle, the angle from north of the current groundspeed vector, about the `k` inertial axis.

&gamma; is the flight path angle, or the vertical angle measured from the `i` body frame axis rotated around `j`. This angle increases as the aircraft pitches up. The formula for change in height as the vehicle is climbing is `h=Vg*sin(γ)`

TeX test:
$a=3$
