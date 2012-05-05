/* PID
 *
 * Encapsulates a sampled PID command. Takes the three parameters at creation,
 * plus an initial command.
 *
 * The reference command can then be set to other values.
 *
 * To obtain the output command, you have to provide the object with a feedback,
 * via the updateFeedback method.
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
