RUR
---

This little thing is named after the 1920 theater play from Karel Čapek,
Rossum's Universal Robots.

The project's goal is to simulate a simple robot, featuring :

 - two motors whose radial speed can be set
 - odometry without the hassle

Other modules could be added in the future (e.g. bumpers or proximity sensor)


How to control the robot
------------------------

*To do* :
 - low level API : done
 - GoTo, GoThrough : _to do_

Direct access to the motors
===========================

The motors can be controlled directly through these functions :

 - `SetLeftPw( float )`
 - `SetRightPw( float )`

The motors will then run until another command stopping them is issued. The
single argument is the power percentage to be used, and it can range from 0
(motor stopped) to 1 (motor at maximum power). Speed corresponding to full power
can be adjusted in the configuration file.

Higher level API
================

Alternatively, the user can control the robot through two other functions :

 - GoTo( point )
 - GoThrough( PointsList )

The names speak for themselves.

As for the point, it is a simple class with two fields, `x` and `y`, which
again speak for themselves. It is defined in the file `2dGeometry.js`

The control function meant to achieve the functionality of simply designating a
point to the robot, and letting it go there, is yet to be designed. The user
will be encouraged to change it if he/she feels the need.


Odometry
--------

*ToDo* : done

The robot's odometry is implemented following this [Wikipedia
page](http://fr.wikipedia.org/wiki/Odom%C3%A9trie "sorry for the french").

The robot's position is described by two parameters :

 - its center's position, a point (cf. up there)
 - its nose's orientation, in radians.

These parameters are updated every 10ms.


Representation
--------------

*To do* :
 - Robot.draw : done
 - rest of the world (grid, axis, robot's info panel) : _to do_

The robot is schematically drawn in a canvas.

The user can plan its path by drawing it, and has a visual feedback of the
motors power levels through two sliders. He can also directly control the robot
using a joystick or the keyboard's arrows.


Robot's control from the user point of view
-------------------------------------------

*To do* :
 - binding with the keyboard's arrows : done
 - joystick : _to do_
 - mouse (path drawing) : _to do_
