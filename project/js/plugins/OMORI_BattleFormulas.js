/*=============================================================================
 * OMORI -- Battle Formulas
 * By Archeia - http://www.archeia.moe
 *=============================================================================
 
//* -----------------------------------------------------------------------*/
//* Release Stress/Energy
//* this.omoriStressReleaseFormula(a, b)
//* -----------------------------------------------------------------------*/
Game_Action.prototype.omoriStressReleaseFormula = function(a, b) {
	var value = a.level >= 30 ? 1000 : a.level >= 15 ? 600 : 300
	return value; 
};
