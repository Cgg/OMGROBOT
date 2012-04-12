/* RUR
 *
 */

/* Some guidelines I try to stick with :
 *
 * - variables declarations are sorted between the different objects and the
 *   variable name is prefixed accordingly
 * - local variables may not use prefixes
 * - after the prefix I use camel case for the variables and underscore
 * separated uppercase for the constants
 * - if a variable is a constant its name is in uppercase (not the prefix)
 */

init = function()
{
  /* Wonderful html world */
  h_canvas = document.getElementById( "mainCanvas" );

  /* constants */
  REFRESH_RATE = 33;  // ms

  /* field's constants */
  f_W      = h_canvas.width;
  f_H      = h_canvas.height;

  h_canvas.addEventListener( "mousedown", onMouseLeftDown, false );
  h_canvas.addEventListener( "contextmenu", onMouseRightDown, false );
  h_canvas.addEventListener( "mouseup"  , onMouseUp  , false );
  h_canvas.addEventListener( "mousemove", onMouseMove, false );

  setInterval( draw, REFRESH_RATE );
};


/* mouse events handlers */
onMouseLeftDown = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  return true;
};

onMouseRightDown = function( evt )
{
  // this simply prevents the context menu to appear when the user right-clicks
  // on the canvas.
  evt.preventDefault();

  var cursorPostion = getCursorPos( evt );

  return true;
};

onMouseUp = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  return true;
};

onMouseMove = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  return true;
};


/* Compute cursor postion in the canvas from a mouse event */
getCursorPos = function( mouseEvt )
{
  var x;
  var y;

  if( mouseEvt.pageX !== undefined && mouseEvt.pageY !== undefined )
  {
    x = mouseEvt.pageX;
    y = mouseEvt.pageY;
  }
  else
  {
    x = mouseEvt.clientX + document.body.scrollLeft +
    document.documentElement.scrollLeft;

    y = mouseEvt.clientY +
    document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= h_canvas.offsetLeft;
  y -= h_canvas.offsetTop;

  var pos = new Point( x, y );

  return pos;
};


/* Responsible for drawing everything on the screen */
draw = function()
{
  var ctx = h_canvas.getContext( "2d" );

  ctx.save();

  ctx.clearRect( 0, 0, f_W, f_H );

  // do the drawing

  ctx.restore();
};


/* Reimplementation to prevent the user to accidentally select stuff while
 * dragging around the cursor
 */
document.onselectstart = function()
{
  return false;
};


Object.prototype.clone = function()
{
  var newObj = (this instanceof Array) ? [] : {};

  for (var i in this)
  {
    if( i == 'clone' ) continue;

    if (this[i] && typeof this[i] == "object")
    {
      newObj[i] = this[i].clone();
    }
    else
    {
      newObj[i] = this[i];
    }
  }

  return newObj;
};