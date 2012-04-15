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


MouseButtons =
{
  "LEFT"   : 1,
  "MIDDLE" : 2,
  "RIGHT"  : 3
};


init = function()
{
  /* Wonderful html world */
  h_canvas = document.getElementById( "mainCanvas" );

  /* constants */
  REFRESH_RATE = 33;  // ms

  /* field's constants */
  f_W      = h_canvas.width;
  f_H      = h_canvas.height;

  h_canvas.addEventListener( "contextmenu", onCtxMenu, false );
  h_canvas.addEventListener( "mouseup"  , onMouseUp  , false );

  keyboard = new Keyboard( window );
  graph    = new Graph( h_canvas );

  robot = new Robot( new Point( 300, 100 ), 0 );

  userInput = setInterval( getUserInput, 100 );
  setInterval( draw, REFRESH_RATE );
};


getUserInput = function()
{
  var l = 0;
  var r = 0;

  if( keyboard.isKeyDown( 38 ) ) // up arrow
  {
    l = 1;
    r = 1;

    if( keyboard.isKeyDown( 37 ))
      l = 0.5;
    else if( keyboard.isKeyDown( 39 ) )
      r = 0.5;
  }
  else if( keyboard.isKeyDown( 37 ) ) // left
  {
    l = -1;
    r = 1;
  }
  else if( keyboard.isKeyDown( 39 ) ) // right
  {
    l = 1;
    r = -1;
  }
  else if( keyboard.isKeyDown( 40 ) ) // down
  {
    l = -0.5;
    r = -0.5;
  }

  robot.setLeftPw( l );
  robot.setRightPw( r );
};


/* mouse events handlers */
onMouseUp = function( evt )
{
  if( evt.which == MouseButtons.LEFT )
  {
    var cursorPostion = getCursorPos( evt );

    // start the graph object and remove this listener. It will be re-added as
    // soon as we receive the event "Graph finished" or "robot done"
    // stop taking user inputs
    h_canvas.removeEventListener( "mouseup", onMouseUp, false );
    graph.startGraph( robot.origin.clone() );
    graph.addNode( cursorPostion );

    // unplug user's input and stop the robot
    clearInterval( userInput );
    robot.setLeftPw( 0 );
    robot.setRightPw( 0 );
  }

  return true;
};

onCtxMenu = function( evt )
{
  // this simply prevents the context menu to appear when the user right-clicks
  // on the canvas.
  evt.preventDefault();

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

  graph.draw();
  robot.draw( ctx );

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
