/* Robot
 *
 * Defines the robot and its behavior, as well as the drawing on the canvas.
 */

/* Constants relative to the robot */
Robot.wheelMaxSpeed = 20;  // pixels/second
Robot.width         = 20;  // pixels
Robot.dtUpdate      = 1 / 100 ; // s

/* build a robot, given its point of origin and its first orientation */
function Robot( firstOrigin, firstOrientation )
{
  // position
  this.origin      = firstOrigin;
  this.orientation = firstOrientation;

  // motors
  this.leftPw  = 0;
  this.rightPw = 0;

  setInterval( Delegate( this, this.updatePosition ), Robot.dtUpdate );
}

/* Update the robot's position and orientation given the wheels speeds. */
Robot.updatePosition = function()
{
  var leftSpeed  = this.leftPw * Robot.wheelMaxSpeed;
  var rightSpeed = this.rightPw * Robot.wheelMaxSpeed;

  var originSpeed = ( leftSpeed + rightSpeed ) / 2;
  var radius      = ( Robot.width / 2 ) *
                    ( ( leftSpeed + rightSpeed ) / ( rightSpeed - leftSpeed ) );

  var x_o = this.origin.x - radius * Math.sin( this.orientation );
  var y_o = this.origin.y - radius * Math.cos( this.orientation );

  var dtheta = ( originSpeed / radius ) * Robot.dtUpdate;

  this.orientation += dtheta;

  // here we use the updated orientation
  this.origin.x = x_o + radius * Math.sin( this.orientation );
  this.origin.y = y_o + radius * Math.cos( this.orientation );
};
