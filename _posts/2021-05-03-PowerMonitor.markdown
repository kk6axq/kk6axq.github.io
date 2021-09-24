---
layout: post
title: "PowerMonitor: Modular Power Management for Small Robots"
date: 2021-05-03 10:00:00 -0000
excerpt_separator: <!--more-->
---
{% include image.html url="https://raw.githubusercontent.com/kk6axq/PowerMonitor/main/media/PCB%20Iso%20View.png" description="" width="75%" %}
For an honors contract in EGR216, Electrical Fundamentals, I researched, designed, and built a power management board for small robotics applications. It uses modularized sensors and a state machine to track fault conditions and prevent damage to the robot and battery. This project was my first leap into the world of surface mount PCB design.
<!--more-->

This project was an extension of my investigation into the basics of robot control systems, stemming from my CLMC project from the previous semester. This project was run in conjunction with another honors contract I had in EGR102, which worked on developing the robot this board would provide power to.

I wanted to use a LiPo battery for this robot, but I didn't want to over discharge the battery or accidentally short the battery and pump 60+ amps through delicate circuitry. Rather than use some off the shelf modules, I decided to break the problem down and build a modularized solution.

At its core, the system is comprised of just a few simple modules: short circuit protection, current sensor, voltage sensor, cutoff relay, microcontroller, and power supply.
{% include image.html url="https://raw.githubusercontent.com/kk6axq/PowerMonitor/main/media/Block%20Diagram.jpg" description="Block diagram" width="50%" %}
These modules enable a large number of features:
* Short circuit protection
* Over current protection
* Over and under voltage protection
* Voltage and current monitoring
* Load control
* Voltage regulation for the downstream device, in addition to battery voltage
* Bidirectional communication and control with the downstream device


Designing the system in this modularized fashion allows it to be easily reused for higher power applications. Ultimately, the hope is that this project can easily be adapted for future, larger robots I design.

As my first journey into surface mount PCB design, this was quite the experience. I learned a lot of [lessons](https://github.com/kk6axq/PowerMonitor/blob/main/ImprovementsAndLessonsLearned.md), especially about completing a project in a tight time schedule. Because of the length of the semester, I was pretty committed to my first prototype and didn't have time to manufacture a new PCB and to update the part selection. Despite this, the project was ultimately successful, and I was able to [benchmark](https://github.com/kk6axq/PowerMonitor/blob/main/Docs/Benchmarking.md) the performance of the device.

The project is in a finalized state, and all the design files, documentation, and software can be viewed here: [https://github.com/kk6axq/PowerMonitor](https://github.com/kk6axq/PowerMonitor)
