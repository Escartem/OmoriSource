//=============================================================================
// TDS Particles
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_Particles = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.Particles = _TDS_.Particles || {};
//=============================================================================
 /*:
 * @plugindesc
 * Particle system.
 *
 * @author TDS
 *
 */
//=============================================================================




//=============================================================================
// ** Sprite_Particle
//-----------------------------------------------------------------------------
//  This sprite class is used to draw and process particle sprites.
//=============================================================================
function Sprite_Particle() { this.initialize.apply(this, arguments); };
Sprite_Particle.prototype = Object.create(Sprite.prototype);
Sprite_Particle.prototype.constructor = Sprite_Particle;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_Particle.prototype.initialize = function(bitmap) {
  // Super Call
  Sprite.prototype.initialize.call(this, bitmap);
  // Phase Index
  this._phaseIndex = 0;
  // Phases
  this._phases = []
};
//=============================================================================
// * Setup
//=============================================================================
Sprite_Particle.prototype.setup = function(phases) {
  // Clone Phases
  this._phases = phases.clone();
};
//=============================================================================
// * Determine if Finished
//=============================================================================
Sprite_Particle.prototype.isFinished = function() { return this._phaseIndex >= this._phases.length; };
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Particle.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Get Current Phase
  var phase = this._phases[this._phaseIndex];
  // If Phase Exists
  if (phase) {
    // Update Phase
    this.updatePhase(phase);
    // If Phase is Finished
    if (phase.duration <= 0) {
      // Increase Phase Index
      this._phaseIndex++
    };
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Particle.prototype.updatePhase = function(phase) {
  // Decrease Phase Duration
  phase.duration--
  // If Phase as a Function
  if (phase.functStart) { phase.functStart.call(this, phase); };
  this.x += phase.x;
  this.y += phase.y;
  this.rotation += phase.rotation * (Math.PI / 360);
  this.opacity += phase.opacity;
  this.scale.x += phase.scaleX;
  this.scale.y += phase.scaleY;
  // If Phase as a Function
  if (phase.functEnd) { phase.functEnd.call(this, phase); };
};














//=============================================================================
// ** Sprite_BattleFaceStatusEmitter
//-----------------------------------------------------------------------------
//  This sprite is used to display battle face status particles.
//=============================================================================
function Sprite_BattleFaceStatusEmitter() { this.initialize.apply(this, arguments); };
Sprite_BattleFaceStatusEmitter.prototype = Object.create(Sprite.prototype);
Sprite_BattleFaceStatusEmitter.prototype.constructor = Sprite_BattleFaceStatusEmitter;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Clear Values
  this.clear();
  // Deactivate
  this.deactivate();



  // this.setupGenerator('suns')
  // this.activate();
};
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.activate = function() { this._active = true;};
Sprite_BattleFaceStatusEmitter.prototype.deactivate = function() { this._active = false;};
//=============================================================================
// * Clear
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.clear = function() {
  // Set Intensity (How many sprites to spawn each time)
  this._intensity = 1;
  this._intensityVariance = 0;
  // Set Generation Type
  this._generateFunct = null;
  // Set Spawn Timer
  this._spawnTimer = 0;
  this._spawnTimerVariance = 0;
  this._spawnTimerCount = this._spawnTimer;
  // Set Child Limit
  this._childLimit = 0;
};
//=============================================================================
// * Setup generator
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.setupGenerator = function(type, settings = {}) {
  // Clear
  this.clear();
  // Switch  Type Case
  switch (type.toLowerCase()) {
    case 'angrytest':
      this._intensity = 1;
      this._intensityVariance = 0;
      // Set Generation Type
      this._generateFunct = this.generateAngry;    
      // Set Spawn Timer
      this._spawnTimer = 10;
      this._spawnTimerVariance = 0;
      this._spawnTimerCount = this._spawnTimer;
      // Set Child Limit
      this._childLimit = 20;      
    break;
  }

};
//=============================================================================
// * Generate Angry
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.generateAngry = function() {
  // Get Bitmap
  var bitmap = ImageManager.loadPicture('StatusParticles');
  // Create Sprite
  var sprite = new Sprite_Particle(bitmap);  
  sprite.anchor.set(0.5, 0.5)
  sprite.x = (Math.round(Math.random()) * 2 - 1) * Math.randomInt(45)
  sprite.y = 0
  sprite.setFrame(30, 30, 30, 31)
  sprite.opacity = 0;
  sprite.scale.set(0, 0);
  this.addChild(sprite); 


  // Set Unique Sprite Values
  sprite._baseX = sprite.x; 
  sprite._angryOffset = Math.randomInt(5) 
  sprite._angrySpeed = 1.5 + (Math.randomInt(100) / 100);

  // Create Shake Function
  var shakeFunct = function() {
    // Shake Sprite X value
    this.x = sprite._baseX + (Math.sin((Graphics.frameCount + sprite._angryOffset) * sprite._angrySpeed) * 3);
  };
  // Initialize Phase
  var phases = [];  
  // Set Phase Values
  var xSpeed = 0;
  var ySpeed = -(1 + Math.randomInt(1));
  var rotation = 0

  // Appear Phase
  var phase = {duration: 10, x: xSpeed, y: ySpeed, rotation: rotation, opacity: 26, scaleX: 0.1, scaleY: 0.1}
  phase.functEnd = shakeFunct;
  phases.push(phase);

  // Main Phase (Move up)
  var phase = {duration: 30, x: xSpeed, y: ySpeed * 2, rotation: rotation, opacity: 0, scaleX: 0, scaleY: 0}
  phase.functEnd = shakeFunct;  
  phases.push(phase);

  // Disappear Phase (Explode rotating)
  var phase = {duration: 10, x: xSpeed, y: ySpeed, rotation: 30, opacity: -26, scaleX: 0.1, scaleY: 0.1}
  phase.functEnd = shakeFunct;
  phases.push(phase);
  // Setup Particle Phases
  sprite.setup(phases)
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If Children Exists
  if (this.children.length > 0) {
    // Go Through Children
    this.children.forEach(function(particle) {
      // Remove Child if Finished
      if (particle.isFinished()) {  this.removeChild(particle); };
    }, this);    
  };
  // If Active
  if (this._active) {
    // If Children Length exceeds child limit
    if (this.children.length >= this._childLimit) { return; }

    // If Spawn Timer is not null
    if (this._spawnTimerCount !== null) {
      // Reduce Spawn Timer Count
      this._spawnTimerCount--;
      // If Timer is 0 or less
      if (this._spawnTimerCount <= 0) { 
        // Set Spawn Timer Count
        this._spawnTimerCount = this._spawnTimer + Math.randomInt(this._spawnTimerVariance);      
      } else {
        return;
      };
    }

    // Call Generation Function
    if (this._generateFunct) { 
      // Generate Amount of Sprites
      for (var i = 0; i < this._intensity + Math.randomInt(this._intensityVariance); i++) {
        // Run Generation Function
        this._generateFunct();         
      };
    };
  };
};




//=============================================================================
// * Generate
//=============================================================================
Sprite_BattleFaceStatusEmitter.prototype.generate = function() {

  var bitmap = ImageManager.loadPicture('StatusParticles');

  var sprite = new Sprite_Particle(bitmap);  
  sprite.anchor.set(0.5, 0.5)
  sprite.x = (Math.round(Math.random()) * 2 - 1) * Math.randomInt(50)
  sprite.y = Math.randomInt(5);
  sprite.setFrame(30, 30, 30, 31)
  sprite.opacity = 0;
  sprite.scale.set(0, 0);
  this.addChild(sprite);  

  // sprite.opacity = 0;
  // sprite.scale.x = sprite.scale.y = 0;
  // sprite.blendMode = Math.random() > 0.5 ? Graphics.BLEND_ADD : 0;
  // sprite.setBlendColor([219, 10, 91, 100]);



  var phases = [];  

  sprite._sadSpeed = Math.randomInt(10) / 100

  var shakeFunct = function() {

    this.x = sprite._baseX + (Math.sin(Graphics.frameCount * sprite._sadSpeed) * 3);
    // this.x = this._baseX + (Math.round(Math.random()) * 2 - 1) * Math.randomInt(3)
  }


  var xSpeed = 0;
  var ySpeed = 0//- (1 + Math.randomInt(1))

  sprite.x = (Math.round(Math.random()) * 2 - 1) * Math.randomInt(30)
  sprite.y = -80;
  sprite.y += Math.randomInt(10)
  sprite.setFrame(90, 30, 30, 31)

  sprite._baseX = sprite.x;  

  // Appear Phase
  var phase = {duration: 10, x: xSpeed, y: ySpeed, rotation: 0, opacity: 26, scaleX: 0.1, scaleY: 0.1}
  phase.functEnd = shakeFunct;
  phases.push(phase);

  var phase = {duration: 60, x: xSpeed, y: ySpeed, rotation: 0, opacity: 0, scaleX: 0, scaleY: 0}
  phase.functEnd = shakeFunct;  
  phases.push(phase);


  var phase = {duration: 10, x: xSpeed, y: ySpeed, rotation:  10 + Math.randomInt(10), opacity: -26, scaleX: -0.1, scaleY: -0.1}
  phase.functEnd = shakeFunct;

  phases.push(phase);


  // Setup Particle Phases
  sprite.setup(phases)
};

