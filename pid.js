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

function PID( P, I, D, initReference )
{
}

PID.prototype.updateFeedBack = function( newFeedBack )
{
};

PID.prototype.setReference = function( newRef )
{
};
