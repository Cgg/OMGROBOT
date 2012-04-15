/* Graph.js
 *
 * Let the user draw a graph on an html canvas.
 *  - left click = add a node
 *  - right click = finish the graph
 */


function Graph( canvas )
{
   // origin : center of the graph's first node
   // canvas : html canvas where the graph will be drawn
  this.canvas = canvas;

  this.nodes   = [];
  this.drag    = false;
  this.running = false;
}


/* start and stop function (for drawing the graph).
 * starting to draw the graph resets it, but stopping it leaves it in its final
 * state.
 */
Graph.prototype.startGraph = function( firstPoint )
{
  if( !this.running )
  {
    this.clearNodes();

    this.nodes.push( firstPoint );

    this.canvas.addEventListener( 'mousedown', eDelegate( this, this.onMouseDown ), false );
    this.canvas.addEventListener( 'mouseup', eDelegate( this, this.onMouseUp ), false );
    this.canvas.addEventListener( 'mousemove', eDelegate( this, this.onMouseMove ), false );

    this.running = true;
  }
};

Graph.prototype.stopGraph = function()
{
  if( this.running )
  {
    this.canvas.removeEventListener( 'mousedown', eDelegate( this, this.onMouseDown ), false );
    this.canvas.removeEventListener( 'mouseup', eDelegate( this, this.onMouseUp ), false );
    this.canvas.removeEventListener( 'mousemove', eDelegate( this, this.onMouseMove ), false );

    this.running = false;
    // send the event "Graph Finished !!"
  }
};

// Graph.pause ?


/* Setters
 */
Graph.prototype.addNode = function( point )
{
  this.nodes.push( point );
};

Graph.prototype.rmNode = function( i )
{
  if( i > 0 && i < nodes.length )
  {
    this.nodes = this.nodes.splice( i );
  }
};

Graph.prototype.clearNodes = function()
{
  this.nodes = [];
};


/* Getters
 */
Graph.prototype.node = function( i )
{
  if( i > 0 && i < nodes.length )
  {
    return this.nodes[ i ];
  }
  else
  {
    throw new Error( "node index out of bounds" );
  }
};

Graph.prototype.nodes = function()
{
  return this.nodes;
};


/* Mouse events handlers
 */
Graph.prototype.onMouseDown = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  // TODO check if an existing node exists under the cursor. If so we are dragging.
  this.drag = false;

  return true;
};

Graph.prototype.onMouseUp = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  // add a node if and only we were not dragging an already existing node.
  if( ! this.drag )
    this.nodes.push( cursorPostion );
  else
    this.drag = false;

  return true;
};

Graph.prototype.onMouseMove = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  // TODO keep track of the index of the node being dragged. Set its coordinates
  // to the cursor position.

  return true;
};


/* Where the graph gets drawn.
 */
Graph.prototype.draw = function()
{
  var ctx = this.canvas.getContext( '2d' );

  ctx.save();

  ctx.beginPath();

  for( i = 0 ; i < this.nodes.length - 1 ; i++ )
  {
    ctx.moveTo( this.nodes[i].x, this.nodes[i].y );
    ctx.lineTo( this.nodes[i+1].x, this.nodes[i+1].y );
  }

  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}
