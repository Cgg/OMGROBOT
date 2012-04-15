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

  this.nodes = [];
  this.drag  = false;
}


/* start and stop function (for drawing the graph).
 * starting to draw the graph resets it, but stopping it leaves it in its final
 * state.
 */
Graph.prototype.startGraph = function( firstPoint )
{
  this.clearNodes();

  this.nodes.push( firstPoint );

  this.canvas.addEventListener( 'mousedown', eDelegate( this, this.onMouseDown ), false );
  this.canvas.addEventListener( 'mouseup', eDelegate( this, this.onMouseUp ), false );
  this.canvas.addEventListener( 'mousemove', eDelegate( this, this.onMouseMove ), false );
};

Graph.prototype.stopGraph = function()
{
  this.canvas.removeEventListener( 'mousedown', eDelegate( this, this.onMouseDown ), false );
  this.canvas.removeEventListener( 'mouseup', eDelegate( this, this.onMouseUp ), false );
  this.canvas.removeEventListener( 'mousemove', eDelegate( this, this.onMouseMove ), false );

  // send the event "Graph Finished !!"
};

// Graph.pause ?


/* Setters
 */
Graph.prototype.addNode = function( point )
{
  nodes.push( point );
};

Graph.prototype.rmNode = function( i )
{
  if( i > 0 && i < nodes.length )
  {
    nodes.splice( i );
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
    return nodes[ i ];
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
  console.log( "down", this );

  this.drag = true;
};

Graph.prototype.onMouseUp = function( evt )
{
  var cursorPostion = getCursorPos( evt );
  console.log( "up", this );

  this.drag = false;
};

Graph.prototype.onMouseMove = function( evt )
{
  var cursorPostion = getCursorPos( evt );

  if( this.drag )
    console.log( "drag", this );
};


/* Where the graph gets drawn.
 */
Graph.prototype.draw = function()
{
  var ctx = this.canvas.getContext( '2d' );

  ctx.save();

  for( i = 0 ; i < nodes.length ; i++ )
  {
  }

  ctx.restore();
}
