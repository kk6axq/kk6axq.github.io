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
# Chapter 5: Linear Design Models
The control inputs to the vehicle are the deflection of the flight surfaces (ailerons, elevator, rudder) and thrust (propeller speed). The goal of design modelling is to simplify the equations of motion to link one input to one output. Even though the differential equations are non-linear, over a small region, they can be approximated linearly. 

A blending factor helps handle conditions that leave the linear region. In the equations give, the blending function is denoted $sigma(\alpha)$.

## Coordinated Turns
When the aircraft rolls, the lift vector points inward, countering the centripetal force of a turn. At this point, the equations are:

$F_{lift}sin\phi = m\frac{v^2}{r}$

and

$\dot \psi = \frac{g}{V_\alpha} tan\phi$

Where $R$ is the radius of rotation, $\dot \psi$ is the rate of rotation about the axis of rotation (yaw rate), $V_a$ is the airspeed, and $\phi$ is the roll angle. 

When there is wind, the equations change a little. The equations need to consider the wind vector, and yaw to compensate for this. 

With wind:

$\dot \chi = \frac{g}{V_g}tan\phi cos(\chi - \psi)$

Without wind:

$\dot \chi = \frac{g}{V_g}tan\phi$

Thus, the turning radius is:

$R=\frac{V_a^2}{g \tan\phi}$

## Trimming
Trimming is the process of adjusting the flight control surfaces or inputs to achieve a steady state (flying straight and level with fixed wing vehicles, or not moving/staying level for quadcopters).

For a trim condition, it is described as
$f(x, u) = 0$ for some $f(x, u)=\dot x$

Basically, there is no velocity. In a state of equilibrium, the vehicle is in a trim condition. Trim conditions might also include states that are not constant. 

We want to calculate trim conditions for three flight conditions:
* Travelling at a constant speed
* Climbing at a constant angle
* Orbitting at a constant radius

In these trim states, some state variables can be constrained:
* $\dot u, \dot v, \dot w$ are going to be 0, because the vehicle isn't accelerating.
* $\dot \phi, \dot \theta, \dot p, \dot q$ are all zero because the vehicle isn't rotating. 

Basically, set derivatives to zero or a desired value, then solve the equations of motion to determine the state that achieves this.

This can be done using gradient descent algorithms. In this case, the system should find local minima, not global minima, as it is not ideal to find a solution far from the current vehicle state. 

In a climb, the climb rate and climb angle are constant. MATLAB's trim function can take these target states and the state equations and calculate the level curves with their solutions. 

In a very tiny frame (1/1000 of a sec) the behavior of the system can be linearized. The problem is that you need to use different controllers depending on the operating region. This is where gain scheduling comes in. 


When determining the transfer functions for a control link, like aileron input on roll, the goal is to model the system linearly with a disturbance, where the disturbance is all the linear or non-linear unmodelled dynamics. The disturbance has its own transfer function, that then combines with the actual input to feed into the linear transfer function. 

```
         Disturbance
          ___|___
          |T.F. |
          |_____|
             |
Input -------+ --> [T.F.]

```

## Sideslip

In no wind:

$v= V_a\sin\beta$

With wind:

$\dot v = (V_a \cos \beta)\dot \beta$