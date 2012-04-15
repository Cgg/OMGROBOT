function Delegate( obj, objMethod )
{
  if( arguments.length > 2 )
  {
    var _params = [];
    for( var n = 2; n < arguments.length; ++n )
    {
      _params.push(arguments[n]);
    }
    return function() { return objMethod.apply( obj, _params ); }
  }
  else
  {
    return function() { return objMethod.call( obj ); }
  }
}
