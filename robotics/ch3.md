---
title: Robotics Notes - Chapter 3
---
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
<style>
  .MathJax{
    font-size: 150% !important;
  }
  </style>
# Robotics II, Chapter 3

If you like kinematics, GNC (guidance, navigation, and control) engineering might be for you. This is basically all they do.
## State variables:
Inertial frame:
* $p_n$: North position in inertial frame
* $p_e$: East position in inertial frame
* $p_d$: Down position in inertial frame

Body velocities:
* $u$: Ground velocity along `i` axis in body frame.
* $v$: Ground velocity along `j` axis in body frame.
* $w$: Ground velocity along `k` axis in body frame.

Attitude of the aircraft (Euler angles):
* $\phi$: Roll angle defined with respect to vehicle-2 frame.
* $\theta$: Pitch angle defined with respect to vehicle-1 frame.
* $\psi$: Yaw angle defined with respect to vehicle frame.

Body angular velocities:
* $p$: Body roll rate, along `i` body axis.
* $q$: Body pitch rate, along `j` body axis.
* $r$: Body yaw rate, along `k` body axis.

## Translational kinematics
To translate inertial frame velocity to the body frame, it needs to be multiplied by a rotation matrix. 

$(p_n;p_e;p_d)=R^v_b(u;v;w)$

## Rotational kinematics

Going from respective rotations frame to body frame:
$(p;q;r) = (\dot\phi;0;0) + R^b_{v2}(\phi)(0;\dot\theta;0) + R^b_{v2}+R^{v2}_{v1}(\theta)(0;0;\dot\psi)$

Going from body frame rotations to individual rotation frames:
$(\dot\phi;\dot\theta;\dot\psi)=(1, sin(\phi)tan(\theta), cos(\phi)tan(\theta);\newline 0, cos(\phi), -sin(\phi);\newline 0, sin(\phi)sec(\theta), cos(\phi)sec(\theta)) \cdot (p;q;r)$

## Application of the above:
Onboard sensors, gyros and accelerometers, can generate the onboard $p,q,r$ (Gyros) and $u,v,w$ (Accelerometer integrated).

## Differentiating a vector across two reference frames
When there's a vector in one frame which needs to be differentiated in a parent frame, the following equation applies:
$ \frac {d}{dt_i}\bold{p}=\frac{d}{dt_b}\bold{p}+\omega_{b/i}\times \bold{p}$

## TODO: Add kinematic equations of motion here

## Translational dynamics

$f=\frac{dV_g}{dt_i}m$

or

$f=m(\frac{dV_g}{dt_b}+\omega_{b/i} \times V_g)$

The first component here is the derivative of magnitude. The second part is the derivative of direction.

In the body coordinate frame:

$f=m(\frac{dV^b_g}{dt_b}+\omega^b_{b/i} \times V^b_g)$

$V^b_g=(u;v;w)$ - Body Velocities

$\omega^b_{b/i}=(p;q;r)$ - Body angular velocities

$f_b = (f_x;f_y;f_z)$ - Forces 

Simplified equation in body frame:

$(\dot u;\dot v; \dot w) = (rv-pw; pw-ru; qu-pv) + \frac{1}{m}(f_x;f_y;f_z)$

## Rotation Dynamics

Newton's 2nd law:

$\frac{dh}{dt_i}=m$

Where: $h$ is the angular momentum vector,
$m$ is the sum of all external moments.
Derivative is taken with regards to the intertial frame.

Expressed in the body frame:

$\frac{dh^b}{dt_b}+\omega^b_{b/i}\times h^b=m^b$

Moments of inertia are calculated as $mr^2$. 
Angular momentum equation:

$h^b≜J\omega^b_{b/i}$

$\dot \omega ^b_{b/i}=(\dot p;\dot q; \dot r)$

If an aircraft across the `ik` body plane, then $J_{xy}=J_{yz}=0$