function Delegate( obj, objMethod )
{
  return function(){ return objMethod.call( obj ); };
}
