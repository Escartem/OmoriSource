/*:
 * @plugindesc Filter Controller Blur Quality Patch
 * v 1.01 - replaced Kawase Blur with regular Guassin
 * @author Anisoft (aka Dairnon)
 *
 * @help
 *
 * This adds a new quality param after the blur ammount param.
 * To use simply just add the amount u want after amount param
 *
 *
 * Ex:
 *
 * setFilter id amount quality
 *
 * setFilter 0 32 8
 *
 *
 */
Filter_Controller.defaultFilterParam["blur"] = [8, 4];
Filter_Controller.filterNameMap["blur"] = PIXI.filters.BlurFilter; // -> No KawaseBlur: slow

(function($) {
    $.blur = function(filter, cp) {
        filter.blur = cp[0];
        cp[1] ? filter.quality = cp[1] : null;
    }
})(Filter_Controller.updateFilterHandler);