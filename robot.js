/* Robot
 *
 * Defines the robot and its behavior, as well as the drawing on the canvas.
 */

/* Constants relative to the robot */
Robot.wheelMaxSpeed = 40;  // pixels/second
Robot.width         = 40;  // pixels
Robot.dtUpdate      = 1 / 100 ; // s
Robot.color         = "#FF0000"
Robot.nearColor     = "#FF9100"
Robot.atColor       = "#00FF00"

/* build a robot, given its point of origin and its first orientation */
function Robot( firstOrigin, firstOrientation )
{
  this.color = Robot.color;

  // position
  this.origin      = firstOrigin;
  this.orientation = firstOrientation;

  // motors
  this.leftPw  = 0;
  this.rightPw = 0;

  // where to go
  this.checkPoints = [];

  setInterval( Delegate( this, this.updatePosition ), Robot.dtUpdate );

  this.divRX = document.getElementById( "robotX" );
  this.divRY = document.getElementById( "robotY" );
  this.divRA = document.getElementById( "robotA" );

  this.divTX = document.getElementById( "targetX" );
  this.divTY = document.getElementById( "targetY" );
  this.divTA = document.getElementById( "targetA" );
  this.divTD = document.getElementById( "targetD" );
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
 * If a target is set, asservissment occurs
 */
Robot.prototype.updatePosition = function()
{
  // first uppdate robot's position and orientation
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

  // make sure the orientation stays within a reasonnable range
  if( this.orientation < - Math.PI )
  {
    this.orientation = this.orientation + 2 * Math.PI;
  }
  else if( this.orientation > Math.PI )
  {
    this.orientation = this.orientation - ( 2 * Math.PI );
  }

  // now, if we have a list of points to go through, go to the first of it.
  if( this.checkPoints.length > 0 )
  {
    var tg = this.checkPoints[ 0 ];

    var alpha_tg = - Math.atan2( this.origin.y - tg.y, tg.x - this.origin.x );

    var dalpha = alpha_tg - this.orientation;

    var dd = Math.sqrt( Math.pow( this.origin.x - tg.x, 2 ) +
                        Math.pow( this.origin.y - tg.y, 2 ) );

    var p_lin = Math.atan( dd / 20 ) / ( Math.PI / 2 );
    var angularCoeff = ((dalpha > 0 ? -1:1)*2*dalpha)/Math.PI + 1;
    var p_l   = p_lin * ( dalpha < 0 ? angularCoeff : 1 );
    var p_r   = p_lin * ( dalpha > 0 ? angularCoeff : 1 );
    this.setLeftPw( p_l );
    this.setRightPw( p_r );

    // if we are getting close to the target, trigger the corresponding events.
    if( dd < 5 )
    {
      this.isAtTarget();
    }
    else if( dd < 60 )
    {
      this.isNearTarget();
    }

    // show the current target's coordinate on the html page, as well as our
    // situation with regard to it.
    this.divTX.innerText = tg.x;
    this.divTY.innerText = tg.y;
    this.divTA.innerText = Math.floor( dalpha * 180 / Math.PI );
    this.divTD.innerText = Math.floor( dd );
  }

  // show the robot's coordinates on the html page
  this.divRX.innerText = this.origin.x;
  this.divRY.innerText = this.origin.y;
  this.divRA.innerText = this.orientation * 180 / Math.PI;
};


/* robot's event handlers
 * for when the robot gets within a certain range from the target
 */
Robot.prototype.isNearTarget = function()
{
  if( this.checkPoints.length > 1 )
  {
    this.checkPoints.splice( 0, 1 );
  }

  this.color = Robot.nearColor;
};

// for when the robot is at the target (well very very close to it)
Robot.prototype.isAtTarget = function()
{
  this.checkPoints.splice( 0, 1 );

  this.setLeftPw( 0 );
  this.setRightPw( 0 );

  this.color = Robot.atColor;
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

  ctx.fillStyle = this.color;
  ctx.strokeStye = "#FFFFFF";

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
