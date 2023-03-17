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

  # Chapter 6: Successive loop closure
  This chapter is highly visual, please see the slides for Chapter 6 at the textbook's companion repository for the diagrams: [Book Repository](https://github.com/randybeard/uavbook)

  The vehicle should firstly be able to stabilize itself. 

  The first inner loop is always stabilization. 

  ## Types of autopilots
  * **Successive loop closure.** Uses loops of controllers to generate maneuvers.
  * **Total energy control.** By conservation of energy, the controller looks at the rate of change of the total system energy to find stability. 
  * **LQR control.** Linear quadratic regulator, more sophisticated. It optimizes a cost function to find an ideal solution. 

## Successive loop closure
The innermost loop should be modelled to be close to 1, where the input equals the output. But it must also be the fastest loop in the system, sometimes running at 1000Hz+. This is completed by tuning the gain of the system. This is called inner loop closure.

Then the goal is to make each successive loop approximate 1. In this way a complex system can be balanced. 

Each successive loop is typically 10x lower in bandwidth/speed than the next inner loop. 

When simplified, these loops basically become spring mass damper systems. 

This can be split across lateral and longitudinal control. 

## Lateral Control
The lateral control loop has three loops, starting from the inside:
### Roll attitude control
Implementation equation:

$\delta_a(t) = k_{p\theta}(\phi^c(t)-\phi(t))-k_{d\theta}p(t)$

### Course hold

### Yaw Damper
Uses rudder to counteract yaw from adverse yaw. 

## Longitudinal control
The longitudinal control loop has three loops, starting from the inside:
### Pitch attitude hold
### Altitude hold
### Airspeed hold
This can be an outer loop, alongside altitude hold
### Throttle hold
This can be an inner loop, if not in pitch attitude hold

### Altitude Hold
Uses a pitch controller to maintain altitude. 

### Airspeed Control
Uses a PI controller to keep $V_a$ at a commanded value. 


## Total Energy Control

Total energy control balances energy inputs and outputs. The fields are as follows

* Input: Thrust (feeds into kinetic energy)
* Output: Drag (feeds out of kinetic energy)
* Transfer: Elevator (transfers kinetic to potential energy and vice versa)


# Principles of autopilot design

The vehicle has a position: $P_n, P_e, P_d$ and an attitude $\phi, \theta, \psi$.

The autopilot should be able to control these parameters. 

Wind also provides a disturbance to this. 

## Flight phases
* Takeoff
* Ascent
* Level flight
* Descent
* Approach
* Landing

## Variables
$V_a$ is the windspeed. 

$V_g$ is the groundspeed.

$V_w$ is the windspeed. 

$\beta$ is the sideslip angle, or the angle in the flat plane between the body $i$ axis and the $V_a$ vector. 


$\chi$ is the vehicle course. 

$\chi_c$ is the crab angle, or the angle in the flat plane between the body $i$ axis and the $V_g$ vector.

## Controls

Longitudinal dynamics handle the forward speed, pitching motion, and climbing. 

Lateral dynamics handle rolling and yawing.