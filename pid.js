/* PID
 *
 * Encapsulates a sampled PID controller. Takes the three parameters at creation,
 * plus initial command and feedback.
 *
 * The reference command can then be set to other values.
 *
 * To obtain the output command, you have to provide the object with a feedback,
 * via the updateFeedback method.
 *
 * The variable names ending with an "N" denote a variable sampled at each step.
 *
 * See http://www.rcva.fr/index.php?option=com_content&view=article&id=27&Itemid=42&limitstart=8
 * for more information about the controller.
 */

function PID( P, I, D, initReference, initFeedback )
{
  this.P = P;
  this.I = I;
  this.D = D;

  this.ITermN = 0;

  this.feedbackN = initFeedback;

  this.reference = initReference;
}

PID.prototype.updateFeedback = function( newFeedback )
{
  var error = this.reference - newFeedback;

  // compute the three terms of the command
  var PTermN  = error * this.P;
  this.ITermN = this.ITermN + ( error * this.I );
  var DTermN  = - this.D * ( newFeedback - this.feedbackN );

  this.feedbackN = newFeedback;

  // return the command, sum of the three terms
  return PTerm + this.ITermN + DTerm;
};

PID.prototype.setReference = function( newRef )
{
  this.reference = newRef;

  // since the reference changed, must reeet the I term.
  this.ITermN = 0;
};

PID.prototype.setRefAndFeedback = function( newRef, newFeedback )
{
  this.setReference( newRef );

  return this.updateFeedBack( newFeedback );
};
