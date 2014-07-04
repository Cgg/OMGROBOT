/* Plop2DGeometry.js
 *
 * Contain all helper classes doing something related to 2D geometry.
 *
 * For now, contains
 *  - Point
 */

/* class Point
 *
 * A Point instance is immutable
 */

function Point( X, Y )
{
  this.x = X;
  this.y = Y;
}

loopAngle = function( angle )
{
  angle = angle % ( 2 * Math.PI );

  if( angle < 0 )
  {
    return 2 * Math.PI + angle;
  }
  else
    return angle;
}
