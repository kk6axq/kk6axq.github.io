---
title: Robotics Notes - Chapter 3
---
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
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