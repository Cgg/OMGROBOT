/* Robot
 *
 * Defines the robot and its behavior, as well as the drawing on the canvas.
 */

/* Constants relative to the robot */
Robot.wheelMaxSpeed = 40;  // pixels/second
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

  // where to go
  this.checkPoints = [];

  setInterval( Delegate( this, this.updatePosition ), Robot.dtUpdate );

  this.divX = document.getElementById( "robotX" );
  this.divY = document.getElementById( "robotY" );
  this.divA = document.getElementById( "robotA" );
}


/* High level API
 */
Robot.prototype.goTo = function( point )
{
  this.checkPoints.unshift( point.clone() )
};

Robot.prototype.goThrough = function( points )
{
  // first reset current CP list.
  this.checkPoints = [];

  // then do a deep copy of given points list
  for( i = 1 ; i < points.length ; i++ )
  {
    this.checkPoints.push( points[i].clone() );
  }
};


/* Update the robot's position and orientation given the wheels speeds.
 * If a target is set asservissment occurs
 */
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

  if( this.orientation < 0 )
  {
    this.orientation = ( 2 * Math.PI ) - this.orientation;
  }
  else if( this.orientation > 2 * Math.PI )
  {
    this.orientation = this.orientation - ( 2 * Math.PI );
  }

  if( this.checkPoints.length > 0 )
  {
    // do some magic
    // - compute distance to target
    // - compute delta orientation

    var tg = this.checkPoints[ 0 ];

    var alpha_tg = - Math.atan2( this.origin.y - tg.y, tg.x - this.origin.x );

    var dalpha = alpha_tg - this.orientation;

    var dd = Math.sqrt( Math.pow( this.origin.x - tg.x, 2 ) +
                        Math.pow( this.origin.y - tg.y, 2 ) );

    var p_lin = Math.atan( dd / 50 ) / ( Math.PI / 2 );
    var p_l   = p_lin * ( dalpha < 0 ? ((-2*dalpha)/Math.PI) + 1 : 1 );
    var p_r   = p_lin * ( dalpha > 0 ? ((-2*dalpha)/Math.PI) + 1 : 1 );
    this.setLeftPw( p_l );
    this.setRightPw( p_r );

    if( dd < 5 )
    {
      this.isAtTarget();
    }
    else if( dd < 30 )
    {
      this.isNearTarget();
    }
  }
};


/* robot's event handlers
 * for when the robot gets within a certain range from the target
 */
Robot.prototype.isNearTarget = function()
{
  this.checkPoints.splice( 0, 1 );
};

// for when the robot is at the target (well very very close to it)
Robot.prototype.isAtTarget = function()
{
  this.checkPoints.splice( 0, 1 );

  this.setLeftPw( 0 );
  this.setRightPw( 0 );
};


/* Getters for the robot's motors
 */
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


/* Draw a schematic robot in the given 2d context.
 */
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
