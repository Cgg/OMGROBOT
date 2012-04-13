/* Keyboard.js
 *
 * Encapsulate keyboard handling for a DOM element. Pressed keys are stored for
 * user queries, and deleted once the key is released.
 */

function Keyboard( domElem )
{
  domElem.addEventListener( "keydown", Delegate( this, this.onKeyDown ), false );
  domElem.addEventListener( "keyup", Delegate( this, this.onKeyUp ), false );

  this.pressed = {};
};

Keyboard.prototype.onKeyDown = function( evt )
{
  evt = evt || window.event;

  // if we use up and down arrows, this prevents the page from scrolling
  if( evt.keyCode == 38 || evt.keyCode == 40 )
  {
    evt.preventDefault();
  }

  this.pressed[ evt.keyCode ] = true;
};

Keyboard.prototype.onKeyUp = function( evt )
{
  evt = evt || window.event;

  delete this.pressed[ evt.keyCode ];
};

Keyboard.prototype.isKeyDown = function( key )
{
  return this.pressed[ key ] || false;
};
