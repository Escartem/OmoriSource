"use strict";
//=============================================================================
// TDS External Notes
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_ExternalNotes = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.ExternalNotes = _TDS_.ExternalNotes || {};
//=============================================================================
 /*:
 * @plugindesc
 * This script allows you to set notes for objects with an external file.
 *
 * @author TDS
 *
 * @help
 * ============================================================================
 * * Notes
 * ============================================================================
 *
 *    <LoadNotes: KEY, VALUE>
 *
 *    KEY
 *    ^ Key name. (Used to divide different types of notes)
 *    
 *
 *    VALUE
 *    ^ Value name. (Contains the contents of the notes)
 *
 *
 *    Example:
 *
 *      <LoadNotes: Actors, test1>
 */
//=============================================================================




//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ExternalNotes.DataManager_loadDatabase    = DataManager.loadDatabase;
_TDS_.ExternalNotes.DataManager_extractMetadata = DataManager.extractMetadata;
//=============================================================================
// * Load Database
//=============================================================================
DataManager.loadDatabase = function() {
  var path = require('path');
  var fs = require('fs');
  var yaml = require('./js/libs/js-yaml-master')    
  var base = path.dirname(process.mainModule.filename);
  // If External Notes Data is undefined
  if (window['$externalNotesData'] === undefined) { 
    // Get Atlas File
    window['$externalNotesData'] = yaml.safeLoad(fs.readFileSync(base + '/data/Notes.yaml', 'utf8'));    
  };
  // Run Original Function
  _TDS_.ExternalNotes.DataManager_loadDatabase.call(this);
};
//=============================================================================
// * Extract Metadata
//=============================================================================
DataManager.extractMetadata = function(data) {
  // If Data note is not empty
  if (data.note.length > 0) {
    // Get Regular Expression
    var re = /<LoadNotes:(.+)>/gmi;
    // Notes
    var notes = '';
    // Iterate
    for (;;) {
      // Get Match
      var match = re.exec(data.note);
      // If Match
      if (match) {
        // Get Arguments
        var args = RegExp.$1.split(',');       
        // Add Custom notes to notes
        notes += $externalNotesData.NOTES[args[0].trim()][args[1].trim()] + '\n'        
      } else {
        break;
      };
    };
    // Add Custom notes to data notes
    data.note += notes;
  };
  // Run Original Function
  _TDS_.ExternalNotes.DataManager_extractMetadata.call(this, data);
};
