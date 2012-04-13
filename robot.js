/* Robot
 *
 * Defines the robot and its behavior, as well as the drawing on the canvas.
 */

/* Constants relative to the robot */
Robot.wheelMaxSpeed = 20;  // pixels/second
Robot.width         = 40;  // pixels
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

Robot.prototype.setLeftPw = function( level )
{
  if( level <= 1 && level >= -1 )
  {
    this.leftPw = level;
  }
};

Robot.prototype.setRightPw = function( level )
{
  if( level <= 1 && level >= -1 )
  {
    this.rightPw = level;
  }
};

/* Update the robot's position and orientation given the wheels speeds. */
Robot.prototype.updatePosition = function()
{
  if( ( this.leftPw != this.rightPw ) && ( this.leftPw != -this.rightPw ) )
  {
    var leftSpeed  = this.leftPw * Robot.wheelMaxSpeed;
    var rightSpeed = this.rightPw * Robot.wheelMaxSpeed;

    var originSpeed = ( leftSpeed + rightSpeed ) / 2;
    var radius      = ( Robot.width / 2 ) *
                      ( ( leftSpeed + rightSpeed ) / ( rightSpeed - leftSpeed ) );

    var x_o = this.origin.x + radius * Math.sin( this.orientation );
    var y_o = this.origin.y - radius * Math.cos( this.orientation );

    var dtheta = ( originSpeed / radius ) * Robot.dtUpdate;

    this.orientation -= dtheta;

    // here we use the updated orientation
    this.origin.x = x_o - radius * Math.sin( this.orientation );
    this.origin.y = y_o + radius * Math.cos( this.orientation );
  }
  else if( this.leftPw != 0 )
  {
    if( this.rightPw == - this.leftPw )
    {
      // special case to handle
      var speed = this.leftPw * Robot.wheelMaxSpeed;
      var dtheta = ( speed / ( Robot.width / 2 ) ) * Robot.dtUpdate;
      this.orientation += dtheta;
    }
    else
    {
      var speed  = this.leftPw * Robot.wheelMaxSpeed;
      var d      = speed * Robot.dtUpdate;

      this.origin.x = this.origin.x + d * Math.cos( this.orientation );
      this.origin.y = this.origin.y + d * Math.sin( this.orientation );
    }
  }
};

/* Draw a schematic robot in the given 2d context. */
Robot.prototype.draw = function( ctx )
{
  ctx.save();

  ctx.fillStyle = "#FF9100"
  ctx.strokeStye = "#FFFFFF"

  ctx.translate( this.origin.x, this.origin.y );
  ctx.rotate( this.orientation - ( Math.PI / 2 ) );

  var rw  = Robot.width
  var rw2 = Robot.width / 2;

  ctx.fillRect( -rw2, -rw2, rw, rw );
  ctx.strokeRect( -rw2, -rw2, rw, rw )

  ctx.beginPath();
  ctx.moveTo( 0, rw2 / 2);
  ctx.lineTo( 0, rw2 / 2 + rw2 );
  ctx.closePath();

  ctx.stroke();

  ctx.restore();
};
