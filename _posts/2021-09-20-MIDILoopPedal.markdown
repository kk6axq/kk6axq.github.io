---
layout: post
title: "MIDILoopPedal: A loop pedal for digital musical instruments"
date: 2021-09-20 10:00:00 -0000
excerpt_separator: <!--more-->
---
{% include image.html url="https://raw.githubusercontent.com/kk6axq/MIDILoopPedal/main/deliverables/Phase%20III/Enclosure%20and%20Foot%20Pedal.jpg" description="" width="75%" %}
For an honors contract in EGR201, I am designing a loop pedal for digital musical instruments using the Musical Instrument Digital Interface protocol. This project enables a musician to record tracks which get automatically played back over top of the performance, for layering sounds.
<!--more-->

I first got exposed to loop pedals through songs where a single musician would play all the pieces of a song in real time. As I researched more, I learned that a loop pedal was the key. This musical accessory records tracks then loops it back into the audio stream while the musician plays, allowing one musician to play multiple parts of a song seemingly simultaneously. The Piano Guys' Celloopa is a great example of this effect:

 <iframe width="560" height="315" src="https://www.youtube.com/embed/PtPPfLtJ8es" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In my never-ending quest to expand my experience with various kinds of microcontrollers, I decided to use a Teensy 4.1 on this project. It features a 600MHz Arm Cortex processor, 1024K of RAM, and an integrated SD card port. PJRC, the designer of the Teensy, also provides reference schematics and libraries for sending, receiving, and manipulating MIDI events, making the board perfect for this application. I've calculated that it's possible to store over 15,000 MIDI events in the onboard RAM, and these can be easily and quickly written to the SD card for persistent storage.

So far, the mechanical and electrical design of the project has been completed, and the software design is underway. The expected date of completion is early December 2021. As this project is still in progress, most of the components are subject to change, but all the design files, documentation, and software can be viewed on GitHub: [https://github.com/kk6axq/MIDILoopPedal](https://github.com/kk6axq/MIDILoopPedal)
