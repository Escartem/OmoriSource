/*:
 * @plugindesc v1.20 Plugin supports Tiled Map Editor maps with some additional
 * features.
 * @author Dr.Yami
 *
 * @param Z - Player
 * @desc Z Index for Same as Characters events and Players.
 * Default: 3
 * @default 3
 *
 * @param Z - Below Player
 * @desc Z Index for Below Characters events.
 * Default: 1
 * @default 1
 *
 * @param Z - Above Player
 * @desc Z Index for Above Characters events.
 * Default: 5
 * @default 5
 *
 * @param Half-tile movement
 * @desc Moving and collision checking by half a tile.
 * Can be true or false
 * @default true
 *
 * @param Priority Tiles Limit
 * @desc Limit for priority tile sprites.
 * Should not be too large.
 * @default 256
 *
 * @param Map Level Variable
 * @desc Get and set map level by variable
 * @default 0
 *
 * @help
 * Use these properties in Tiled Map's layer:
 *   zIndex
 *   The layer will have z-index == property's value
 *
 *   collision
 *   The layer will be collision mask layer. Use one of these value:
 *     full - Normal collision (1 full-tile)
 *     arrow - Arrow collision
 *     up-left - Half-tile collision up-left quarter
 *     up-right - Half-tile collision up-right quarter
 *     down-left - Half-tile collision down-left quarter
 *     down-right - Half-tile collision down-right quarter
 *
 *   arrowImpassable
 *   If the layer is an arraw collision mask layer, it will make one direction be impassable
 *   Value can be up, down, left, right
 *
 *   regionId
 *   Mark the layer as region layer, the layer ID will be the value of property
 *
 *   priority
 *   Mark the layer as priority layer, allows it goes above player when player is behind,
 *   below player when player is in front of. Value should be > 0, zIndex should be
 *   the same as player z-index.
 *
 *   level
 *   Mark the layer on different level, use for multiple levels map (for example a bridge).
 *   Default level is 0. Use this for collision and regionId.
 *
 *   hideOnLevel
 *   Hide the layer when on a certain level.
 *
 *   toLevel
 *   The tiles on this layer will transfer player to another level.
 */

var Imported = Imported || {};
Imported.YED_Tiled = true;
const YED_TiledParameters = PluginManager.parameters("YED_Tiled");

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(73);

	__webpack_require__(74);

	var _TiledTilemap = __webpack_require__(75);

	__webpack_require__(76);

	__webpack_require__(77);

	__webpack_require__(78);

	__webpack_require__(79);

/***/ },

/***/ 73:
/***/ function(module, exports) {

	"use strict";

	DataManager._tempTiledData = null;
	DataManager._tiledLoaded = false;
	DataManager._tilesetToLoad = 0;

	var _loadMapData = DataManager.loadMapData;
	DataManager.loadMapData = function (mapId) {
	    _loadMapData.call(this, mapId);
	    if (mapId > 0) {
	        this.loadTiledMapData(mapId);
	    } else {
	        this.unloadTiledMapData();
	    }
	};

	DataManager.loadTiledMapData = function (mapId) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', "./maps/Map" + mapId + ".json");
	    xhr.overrideMimeType('application/json');

	    // on success callback
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	            if (xhr.status === 200 || xhr.responseText !== "") {
	                DataManager._tempTiledData = JSON.parse(xhr.responseText);
	            }
	            DataManager.loadTilesetData();
	            DataManager._tiledLoaded = true;
	        }
	    };

	    // set data to null and send request
	    this.unloadTiledMapData();
	    xhr.send();
	};

	DataManager.loadTilesetData = function () {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        var _loop = function _loop() {
	            var tileset = _step.value;

	            if (!tileset.source) {
	                return "continue";
	            }

				if(Utils.isOptionValid("test")) {
					DataManager._tilesetToLoad++;
					var filename = tileset.source.replace(/^.*[\\\/]/, '');
					var xhr = new XMLHttpRequest();

					xhr.open('GET', "./maps/" + filename);
					xhr.overrideMimeType('application/json');

					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status === 200 || xhr.responseText !== "") {
								Object.assign(tileset, JSON.parse(xhr.responseText));
							}
							DataManager._tilesetToLoad--;
						}
					};

					xhr.send();					
				}
				else {
					DataManager._tilesetToLoad++;
					var filename = tileset.source.replace(/^.*[\\\/]/, '');
					const path = require('path');
					const fs = require('fs');
					var base = path.dirname(process.mainModule.filename);
					filename = filename.replace(".json", ".AUBREY")
					fs.readFile(base + "/maps/" + filename, (err, data) => {
						if(err) {throw new Error(err)}
						data = Encryption.decrypt(data);
						Object.assign(tileset,JSON.parse(data.toString()))
						DataManager._tilesetToLoad--;
					});

				}
	        };

	        for (var _iterator = DataManager._tempTiledData.tilesets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _ret = _loop();

	            if (_ret === "continue") continue;
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};

	DataManager.unloadTiledMapData = function () {
	    DataManager._tempTiledData = null;
	    DataManager._tiledLoaded = false;
	    DataManager._tilesetToLoad = 0;
	};

	var _isMapLoaded = DataManager.isMapLoaded;
	DataManager.isMapLoaded = function () {
	    var defaultLoaded = _isMapLoaded.call(this);
	    var tiledLoaded = DataManager._tiledLoaded;
	    var tilesetLoaded = DataManager._tilesetToLoad <= 0;

	    return defaultLoaded && tiledLoaded && tilesetLoaded;
	};

/***/ },

/***/ 74:
/***/ function(module, exports) {

	"use strict";

	ImageManager.loadParserTileset = function (path, hue) {
	    if (!path) {
	        return this.loadEmptyBitmap();
	    }
	    var paths = path.split("/");
	    var filename = paths[paths.length - 1];
	    var realPath = "img/tilesets/" + filename;

	    return this.loadNormalBitmap(realPath, hue);
	};

	ImageManager.loadParserParallax = function (path, hue) {
	    if (!path) {
	        return this.loadEmptyBitmap();
	    }
	    var paths = path.split("/");
	    var filename = paths[paths.length - 1];
	    var realPath = "img/parallaxes/" + filename;

	    return this.loadNormalBitmap(realPath, hue);
	};

/***/ },

/***/ 75:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TiledTilemap = exports.TiledTilemap = function (_ShaderTilemap) {
	    _inherits(TiledTilemap, _ShaderTilemap);

	    function TiledTilemap() {
	        _classCallCheck(this, TiledTilemap);

	        return _possibleConstructorReturn(this, (TiledTilemap.__proto__ || Object.getPrototypeOf(TiledTilemap)).apply(this, arguments));
	    }

	    _createClass(TiledTilemap, [{
	        key: 'initialize',
	        value: function initialize(tiledData) {
	            this._tiledData = {};
	            this._layers = [];
	            this._priorityTiles = [];
	            this._priorityTilesCount = 0;
	            this.tiledData = tiledData;
	            _get(TiledTilemap.prototype.__proto__ || Object.getPrototypeOf(TiledTilemap.prototype), 'initialize', this).call(this);
	            this.setupTiled();
	        }
	    }, {
	        key: 'setupTiled',
	        value: function setupTiled() {
	            this._setupSize();
	            this._setupAnim();
	        }
	    }, {
	        key: '_setupSize',
	        value: function _setupSize() {
	            var width = this._width;
	            var height = this._height;
	            var margin = this._margin;
	            var tileCols = Math.ceil(width / this._tileWidth) + 1;
	            var tileRows = Math.ceil(height / this._tileHeight) + 1;
	            this._tileWidth = this.tiledData.tilewidth;
	            this._tileHeight = this.tiledData.tileheight;
	            this._layerWidth = tileCols * this._tileWidth;
	            this._layerHeight = tileRows * this._tileHeight;
	            this._mapWidth = this.tiledData.width;
	            this._mapHeight = this.tiledData.height;
	        }
	    }, {
	        key: '_setupAnim',
	        value: function _setupAnim() {
	            this._animFrame = {};
	            this._animDuration = {};

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.tiledData.tilesets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var tileset = _step.value;

	                    var tilesData = tileset.tiles;
	                    if (!tilesData) {
	                        continue;
	                    }
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = Object.keys(tilesData)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var tileId = _step2.value;

	                            var tile = tilesData[tileId];
	                            var animation = tile.animation;
	                            if (!animation) continue;
	                            this._animFrame[tileId] = 0;
	                            var duration = animation[0].duration / 1000 * 60;
	                            this._animDuration[tileId] = duration;
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_createLayers',
	        value: function _createLayers() {
	            var id = 0;
	            this._needsRepaint = true;

	            var parameters = PluginManager.parameters('ShaderTilemap');
	            var useSquareShader = Number(parameters.hasOwnProperty('squareShader') ? parameters['squareShader'] : 0);

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.tiledData.layers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var layerData = _step3.value;

	                    var zIndex = 0;
	                    if (layerData.type != "tilelayer") {
	                        id++;
	                        continue;
	                    }

	                    if (!!layerData.properties && !!layerData.properties.zIndex) {
	                        zIndex = parseInt(layerData.properties.zIndex);
	                    }

	                    if (!!layerData.properties && !!layerData.properties.collision) {
	                        id++;
	                        continue;
	                    }

	                    if (!!layerData.properties && !!layerData.properties.toLevel) {
	                        id++;
	                        continue;
	                    }

	                    if (!!layerData.properties && !!layerData.properties.regionId) {
	                        id++;
	                        continue;
	                    }

	                    if (this._isReflectLayer(layerData)) {
	                        id++;
	                        continue;
	                    }

	                    var layer = new PIXI.tilemap.CompositeRectTileLayer(zIndex, [], useSquareShader);
	                    layer.layerId = id; // @dryami: hack layer index
	                    layer.spriteId = Sprite._counter++;
	                    this._layers.push(layer);
	                    this.addChild(layer);
	                    id++;
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            this._createPriorityTiles();
	        }
	    }, {
	        key: '_createPriorityTiles',
	        value: function _createPriorityTiles() {
	            var pluginParams = YED_TiledParameters;
	            var size = parseInt(pluginParams["Priority Tiles Limit"]);
	            var zIndex = parseInt(pluginParams["Z - Player"]);
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = Array(size).keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var x = _step4.value;

	                    var sprite = new Sprite_Base();
	                    sprite.z = sprite.zIndex = zIndex;
	                    sprite.layerId = -1;
	                    sprite.hide();
	                    this.addChild(sprite);
	                    this._priorityTiles.push(sprite);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_isReflectLayer',
	        value: function _isReflectLayer(layerData) {
	            var properties = layerData.properties;
	            return !!properties && (properties.reflectionSurface || properties.reflectionCast);
	        }
	    }, {
	        key: '_hackRenderer',
	        value: function _hackRenderer(renderer) {
	            return renderer;
	        }
	    }, {
	        key: 'refreshTileset',
	        value: function refreshTileset() {
	            var bitmaps = this.bitmaps.map(function (x) {
	                return x._baseTexture ? new PIXI.Texture(x._baseTexture) : x;
	            });
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this._layers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var layer = _step5.value;

	                    layer.setBitmaps(bitmaps);
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            _get(TiledTilemap.prototype.__proto__ || Object.getPrototypeOf(TiledTilemap.prototype), 'update', this).call(this);
	            this._updateAnim();
	        }
	    }, {
	        key: '_updateAnim',
	        value: function _updateAnim() {
	            var needRefresh = false;
	            for (var key in this._animDuration) {
	                this._animDuration[key] -= 1;
	                if (this._animDuration[key] <= 0) {
	                    this._animFrame[key] += 1;
	                    needRefresh = true;
	                }
	            }

	            if (needRefresh) {
	                this._updateAnimFrames();
	                this.refresh();
	            }
	        }
	    }, {
	        key: '_updateAnimFrames',
	        value: function _updateAnimFrames() {
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;

	            try {
	                for (var _iterator6 = this.tiledData.tilesets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var tileset = _step6.value;

	                    var tilesData = tileset.tiles;
	                    if (!tilesData) {
	                        continue;
	                    }
	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;

	                    try {
	                        for (var _iterator7 = Object.keys(tilesData)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var tileId = _step7.value;

	                            var tile = tilesData[tileId];
	                            var animation = tile.animation;
	                            if (!animation) continue;
	                            var frame = this._animFrame[tileId];
	                            this._animFrame[tileId] = !!animation[frame] ? frame : 0;
	                            frame = this._animFrame[tileId];
	                            var duration = animation[frame].duration / 1000 * 60;
	                            if (this._animDuration[tileId] <= 0) {
	                                this._animDuration[tileId] = duration;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError7 = true;
	                        _iteratorError7 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                _iterator7.return();
	                            }
	                        } finally {
	                            if (_didIteratorError7) {
	                                throw _iteratorError7;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_updateLayerPositions',
	        value: function _updateLayerPositions(startX, startY) {
	            var ox = 0;
	            var oy = 0;
	            if (this.roundPixels) {
	                ox = Math.floor(this.origin.x);
	                oy = Math.floor(this.origin.y);
	            } else {
	                ox = this.origin.x;
	                oy = this.origin.y;
	            }

	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = this._layers[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var layer = _step8.value;

	                    var layerData = this.tiledData.layers[layer.layerId];
	                    var offsetX = layerData.offsetx || 0;
	                    var offsetY = layerData.offsety || 0;
	                    layer.position.x = startX * this._tileWidth - ox + offsetX;
	                    layer.position.y = startY * this._tileHeight - oy + offsetY;
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;

	            try {
	                for (var _iterator9 = this._priorityTiles[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                    var sprite = _step9.value;

	                    var _layerData = this.tiledData.layers[sprite.layerId];
	                    var _offsetX = _layerData ? _layerData.offsetx || 0 : 0;
	                    var _offsetY = _layerData ? _layerData.offsety || 0 : 0;
	                    sprite.x = sprite.origX + startX * this._tileWidth - ox + _offsetX + sprite.width / 2;
	                    sprite.y = sprite.origY + startY * this._tileHeight - oy + _offsetY + sprite.height;
	                }
	            } catch (err) {
	                _didIteratorError9 = true;
	                _iteratorError9 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                        _iterator9.return();
	                    }
	                } finally {
	                    if (_didIteratorError9) {
	                        throw _iteratorError9;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_paintAllTiles',
	        value: function _paintAllTiles(startX, startY) {
	            this._priorityTilesCount = 0;
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;

	            try {
	                for (var _iterator10 = this._layers[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var layer = _step10.value;

	                    layer.clear();
	                    this._paintTiles(layer, startX, startY);
	                }
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }

	            var id = 0;
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;

	            try {
	                for (var _iterator11 = this.tiledData.layers[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var layerData = _step11.value;

	                    if (layerData.type != "objectgroup") {
	                        id++;
	                        continue;
	                    }
	                    this._paintObjectLayers(id, startX, startY);
	                    id++;
	                }
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }

	            while (this._priorityTilesCount < this._priorityTiles.length) {
	                var sprite = this._priorityTiles[this._priorityTilesCount];
	                sprite.hide();
	                sprite.layerId = -1;
	                this._priorityTilesCount++;
	            }
	        }
	    }, {
	        key: '_paintTiles',
	        value: function _paintTiles(layer, startX, startY) {
	            var layerData = this.tiledData.layers[layer.layerId];

	            if (!layerData.visible) {
	                return;
	            }

	            if (layerData.type == "tilelayer") {
	                this._paintTilesLayer(layer, startX, startY);
	            }
	        }
	    }, {
	        key: '_paintObjectLayers',
	        value: function _paintObjectLayers(layerId, startX, startY) {
	            var layerData = this.tiledData.layers[layerId];
	            var objects = layerData.objects || [];

	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;

	            try {
	                for (var _iterator12 = objects[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var obj = _step12.value;

	                    if (!obj.gid) {
	                        continue;
	                    }
	                    if (!obj.visible) {
	                        continue;
	                    }
	                    var tileId = obj.gid;
	                    var textureId = this._getTextureId(tileId);
	                    var dx = obj.x - startX * this._tileWidth;
	                    var dy = obj.y - startY * this._tileHeight - obj.height;
	                    this._paintPriorityTile(layerId, textureId, tileId, startX, startY, dx, dy);
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_paintTilesLayer',
	        value: function _paintTilesLayer(layer, startX, startY) {
	            var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
	            var tileRows = Math.ceil(this._height / this._tileHeight) + 1;

	            var _iteratorNormalCompletion13 = true;
	            var _didIteratorError13 = false;
	            var _iteratorError13 = undefined;

	            try {
	                for (var _iterator13 = Array(tileRows).keys()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                    var y = _step13.value;
	                    var _iteratorNormalCompletion14 = true;
	                    var _didIteratorError14 = false;
	                    var _iteratorError14 = undefined;

	                    try {
	                        for (var _iterator14 = Array(tileCols).keys()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                            var x = _step14.value;

	                            this._paintTile(layer, startX, startY, x, y);
	                        }
	                    } catch (err) {
	                        _didIteratorError14 = true;
	                        _iteratorError14 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                                _iterator14.return();
	                            }
	                        } finally {
	                            if (_didIteratorError14) {
	                                throw _iteratorError14;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                        _iterator13.return();
	                    }
	                } finally {
	                    if (_didIteratorError13) {
	                        throw _iteratorError13;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_paintTile',
	        value: function _paintTile(layer, startX, startY, x, y) {
	            var mx = x + startX;
	            var my = y + startY;
	            if (this.horizontalWrap) {
	                mx = mx.mod(this._mapWidth);
	            }
	            if (this.verticalWrap) {
	                my = my.mod(this._mapHeight);
	            }
	            var tilePosition = mx + my * this._mapWidth;
	            var tileId = this.tiledData.layers[layer.layerId].data[tilePosition];
	            var rectLayer = layer.children[0];
	            var textureId = 0;

	            if (!tileId) {
	                return;
	            }

	            // TODO: Problem with offsets
	            if (mx < 0 || mx >= this._mapWidth || my < 0 || my >= this._mapHeight) {
	                return;
	            }

	            textureId = this._getTextureId(tileId);

	            var tileset = this.tiledData.tilesets[textureId];
	            var dx = x * this._tileWidth;
	            var dy = y * this._tileHeight;
	            var w = tileset.tilewidth;
	            var h = tileset.tileheight;
	            var tileCols = tileset.columns;
	            var rId = this._getAnimTileId(textureId, tileId - tileset.firstgid);
	            var ux = rId % tileCols * w;
	            var uy = Math.floor(rId / tileCols) * h;

	            if (this._isPriorityTile(layer.layerId)) {
	                this._paintPriorityTile(layer.layerId, textureId, tileId, startX, startY, dx, dy);
	                return;
	            }

	            rectLayer.addRect(textureId, ux, uy, dx, dy, w, h);
	        }
	    }, {
	        key: '_paintPriorityTile',
	        value: function _paintPriorityTile(layerId, textureId, tileId, startX, startY, dx, dy) {
	            var tileset = this.tiledData.tilesets[textureId];
	            var w = tileset.tilewidth;
	            var h = tileset.tileheight;
	            var tileCols = tileset.columns;
	            var rId = this._getAnimTileId(textureId, tileId - tileset.firstgid);
	            var ux = rId % tileCols * w;
	            var uy = Math.floor(rId / tileCols) * h;
	            var sprite = this._priorityTiles[this._priorityTilesCount];
	            var layerData = this.tiledData.layers[layerId];
	            var offsetX = layerData ? layerData.offsetx || 0 : 0;
	            var offsetY = layerData ? layerData.offsety || 0 : 0;
	            var ox = 0;
	            var oy = 0;
	            if (this.roundPixels) {
	                ox = Math.floor(this.origin.x);
	                oy = Math.floor(this.origin.y);
	            } else {
	                ox = this.origin.x;
	                oy = this.origin.y;
	            }

	            if (this._priorityTilesCount >= this._priorityTiles.length) {
	                return;
	            }

	            sprite.layerId = layerId;
	            sprite.anchor.x = 0.5;
	            sprite.anchor.y = 1.0;
	            sprite.origX = dx;
	            sprite.origY = dy;
	            sprite.x = sprite.origX + startX * this._tileWidth - ox + offsetX + w / 2;
	            sprite.y = sprite.origY + startY * this._tileHeight - oy + offsetY + h;
	            sprite.bitmap = this.bitmaps[textureId];
	            sprite.setFrame(ux, uy, w, h);
	            sprite.priority = this._getPriority(layerId);
	            sprite.z = sprite.zIndex = this._getZIndex(layerId);
	            sprite.show();

	            this._priorityTilesCount += 1;
	        }
	    }, {
	        key: '_getTextureId',
	        value: function _getTextureId(tileId) {
	            var textureId = 0;
	            var _iteratorNormalCompletion15 = true;
	            var _didIteratorError15 = false;
	            var _iteratorError15 = undefined;

	            try {
	                for (var _iterator15 = this.tiledData.tilesets[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                    var tileset = _step15.value;

	                    if (tileId < tileset.firstgid || tileId >= tileset.firstgid + tileset.tilecount) {
	                        textureId++;
	                        continue;
	                    }
	                    break;
	                }
	            } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                        _iterator15.return();
	                    }
	                } finally {
	                    if (_didIteratorError15) {
	                        throw _iteratorError15;
	                    }
	                }
	            }

	            return textureId;
	        }
	    }, {
	        key: '_getAnimTileId',
	        value: function _getAnimTileId(textureId, tileId) {
	            var tilesData = this.tiledData.tilesets[textureId].tiles;
	            if (!tilesData) {
	                return tileId;
	            }
	            if (!tilesData[tileId]) {
	                return tileId;
	            }
	            if (!tilesData[tileId].animation) {
	                return tileId;
	            }
	            var animation = tilesData[tileId].animation;
	            var frame = this._animFrame[tileId];
	            if (!frame) {
	                return tileId;
	            }
	            return animation[frame].tileid;
	        }
	    }, {
	        key: '_getPriority',
	        value: function _getPriority(layerId) {
	            var layerData = this.tiledData.layers[layerId];
	            if (!layerData.properties) {
	                return 0;
	            }
	            if (!layerData.properties.priority) {
	                return 0;
	            }
	            return parseInt(layerData.properties.priority);
	        }
	    }, {
	        key: '_isPriorityTile',
	        value: function _isPriorityTile(layerId) {
	            var pluginParams = YED_TiledParameters;
	            var playerZIndex = parseInt(pluginParams["Z - Player"]);
	            var zIndex = this._getZIndex(layerId);
	            return this._getPriority(layerId) > 0 && zIndex === playerZIndex;
	        }
	    }, {
	        key: '_getZIndex',
	        value: function _getZIndex(layerId) {
	            var layerData = this.tiledData.layers[layerId];
	            if (!layerData) {
	                return 0;
	            }
	            if (!layerData.properties || !layerData.properties.zIndex) {
	                return 0;
	            }
	            return parseInt(layerData.properties.zIndex);
	        }
	    }, {
	        key: 'hideOnLevel',
	        value: function hideOnLevel(level) {
	            var layerIds = [];
	            var _iteratorNormalCompletion16 = true;
	            var _didIteratorError16 = false;
	            var _iteratorError16 = undefined;

	            try {
	                for (var _iterator16 = this._layers[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	                    var layer = _step16.value;

	                    var layerData = this.tiledData.layers[layer.layerId];
	                    if (layerData.properties && layerData.properties.hasOwnProperty("hideOnLevel")) {
	                        if (parseInt(layerData.properties.hideOnLevel) !== level) {
	                            this.addChild(layer);
	                            continue;
	                        }
	                        layerIds.push(layer.layerId);
	                        this.removeChild(layer);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError16 = true;
	                _iteratorError16 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion16 && _iterator16.return) {
	                        _iterator16.return();
	                    }
	                } finally {
	                    if (_didIteratorError16) {
	                        throw _iteratorError16;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion17 = true;
	            var _didIteratorError17 = false;
	            var _iteratorError17 = undefined;

	            try {
	                for (var _iterator17 = this._priorityTiles[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	                    var sprite = _step17.value;

	                    if (layerIds.indexOf(sprite.layerId) === -1) {
	                        continue;
	                    }
	                    sprite.visible = false;
	                }
	            } catch (err) {
	                _didIteratorError17 = true;
	                _iteratorError17 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion17 && _iterator17.return) {
	                        _iterator17.return();
	                    }
	                } finally {
	                    if (_didIteratorError17) {
	                        throw _iteratorError17;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_compareChildOrder',
	        value: function _compareChildOrder(a, b) {
	            if ((a.z || 0) !== (b.z || 0)) {
	                return (a.z || 0) - (b.z || 0);
	            } else if ((a.y || 0) !== (b.y || 0)) {
	                return (a.y || 0) - (b.y || 0);
	            } else if ((a.priority || 0) !== (b.priority || 0)) {
	                return (a.priority || 0) - (b.priority || 0);
	            } else {
	                return a.spriteId - b.spriteId;
	            }
	        }
	    }, {
	        key: 'tiledData',
	        get: function get() {
	            return this._tiledData;
	        },
	        set: function set(val) {
	            this._tiledData = val;
	            this.setupTiled();
	        }
	    }]);

	    return TiledTilemap;
	}(ShaderTilemap);

/***/ },

/***/ 76:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(Game_Map.prototype, 'tiledData', {
	    get: function get() {
	        return DataManager._tempTiledData;
	    },
	    configurable: true
	});

	Object.defineProperty(Game_Map.prototype, 'currentMapLevel', {
	    get: function get() {
	        var pluginParams = YED_TiledParameters;
	        var varID = parseInt(pluginParams["Map Level Variable"]);
	        if (!varID) {
	            return this._currentMapLevel;
	        } else {
	            return $gameVariables.value(varID);
	        }
	    },
	    set: function set(value) {
	        var pluginParams = YED_TiledParameters;
	        var varID = parseInt(pluginParams["Map Level Variable"]);
	        if (!varID) {
	            this._currentMapLevel = value;
	        } else {
	            $gameVariables.setValue(varID, value);
	        }
	    },
	    configurable: true
	});

	var _setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
	    _setup.call(this, mapId);
	    this._isSetupBefore = this._isSetupBefore || {};
	    this._collisionMap = [];
	    this._arrowCollisionMap = [];
	    this._regions = [];
	    this._mapLevelChange = [];
	    this._currentMapLevel = 0;
	    this._reflection = [];
	    this.currentMapLevel = 0;
	    if (this.isTiledMap()) {
	        $dataMap.width = this.tiledData.width;
	        $dataMap.height = this.tiledData.height;
	        this._setupTiled();
	        this._isSetupBefore[mapId] = true;
	    }
	};

	Game_Map.prototype.isTiledMap = function () {
	    return !!this.tiledData;
	};

	Game_Map.prototype.isSaveEventLocations = function () {
	    if (!this.tiledData.properties) {
	        return false;
	    }
	    return !!this.tiledData.properties.saveEventLocations;
	};

	Game_Map.prototype._setupTiled = function () {
	    this._initializeMapLevel(0);

	    this._setupCollision();
	    this._setupRegion();
	    this._setupMapLevelChange();
	    this._setupReflection();

	    this._setupTiledEvents();
	};

	Game_Map.prototype._initializeMapLevel = function (id) {
	    var width = this.width();
	    var height = this.height();
	    var size = width * height;

	    if (!!this._collisionMap[id]) {
	        return;
	    }

	    this._collisionMap[id] = [];
	    this._arrowCollisionMap[id] = [];
	    this._regions[id] = [];
	    this._mapLevelChange[id] = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = Array(size).keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var x = _step.value;

	            this._collisionMap[id].push(0);
	            this._arrowCollisionMap[id].push(1 | 2 | 4 | 8);
	            this._regions[id].push(0);
	            this._mapLevelChange[id].push(-1);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};

	Game_Map.prototype._getTileProperties = function (tileId) {
	    var tilesetId = 0;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = this.tiledData.tilesets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _tileset = _step2.value;

	            if (tileId < _tileset.firstgid || tileId >= _tileset.firstgid + _tileset.tilecount) {
	                tilesetId++;
	                continue;
	            }
	            break;
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    var tileset = this.tiledData.tilesets[tilesetId];
	    if (!tileId || !tileset || !tileset.tileproperties) {
	        return {};
	    }
	    return tileset.tileproperties['' + (tileId - tileset.firstgid)] || {};
	};

	Game_Map.prototype._setupCollision = function () {
	    this._setupCollisionFull();
	    this._setupCollisionArrow();
	};

	Game_Map.prototype._setupCollisionFull = function () {
	    var width = this.width();
	    var height = this.height();
	    var size = width * height;
	    var halfWidth = width / 2;
	    var halfHeight = height / 2;

	    if (this.isHalfTile()) {
	        size /= 4;
	    }

	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	        for (var _iterator3 = this.tiledData.layers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var layerData = _step3.value;

	            if (!layerData.properties || !layerData.properties.collision) {
	                continue;
	            }

	            if (layerData.properties.collision !== "full" && layerData.properties.collision !== "up-left" && layerData.properties.collision !== "up-right" && layerData.properties.collision !== "down-left" && layerData.properties.collision !== "down-right" && layerData.properties.collision !== "tile-base") {
	                continue;
	            }

	            var level = parseInt(layerData.properties.level) || 0;
	            this._initializeMapLevel(level);

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = Array(size).keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var x = _step4.value;

	                    var realX = x;
	                    var ids = [];
	                    if (this.isHalfTile()) {
	                        realX = Math.floor(x / halfWidth) * width * 2 + x % halfWidth * 2;
	                    }
	                    if (!!layerData.data[x]) {
	                        if (layerData.properties.collision === "full") {
	                            ids.push(realX);
	                            if (this.isHalfTile()) {
	                                ids.push(realX + 1, realX + width, realX + width + 1);
	                            }
	                        }
	                        if (layerData.properties.collision === "up-left") {
	                            ids.push(realX);
	                        }
	                        if (layerData.properties.collision === "up-right") {
	                            ids.push(realX + 1);
	                        }
	                        if (layerData.properties.collision === "down-left") {
	                            ids.push(realX + width);
	                        }
	                        if (layerData.properties.collision === "down-right") {
	                            ids.push(realX + width + 1);
	                        }
	                        if (layerData.properties.collision === "tile-base") {
	                            var tileproperties = this._getTileProperties(layerData.data[x]);
	                            if (tileproperties.collision === "full") {
	                                ids.push(realX);
	                                if (this.isHalfTile()) {
	                                    ids.push(realX + 1, realX + width, realX + width + 1);
	                                }
	                            }
	                        }
	                        var _iteratorNormalCompletion5 = true;
	                        var _didIteratorError5 = false;
	                        var _iteratorError5 = undefined;

	                        try {
	                            for (var _iterator5 = ids[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                                var id = _step5.value;

	                                this._collisionMap[level][id] = 1;
	                            }
	                        } catch (err) {
	                            _didIteratorError5 = true;
	                            _iteratorError5 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                                    _iterator5.return();
	                                }
	                            } finally {
	                                if (_didIteratorError5) {
	                                    throw _iteratorError5;
	                                }
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	            }
	        } finally {
	            if (_didIteratorError3) {
	                throw _iteratorError3;
	            }
	        }
	    }
	};

	Game_Map.prototype._getArrowBit = function (impassable) {
	    var bit = 0;
	    var arrows = impassable.split('&').map(function (i) {
	        return i.trim().toLowerCase();
	    });

	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;

	    try {
	        for (var _iterator6 = arrows[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	            var arrow = _step6.value;

	            if (arrow === 'left') bit ^= 1;
	            if (arrow === 'up') bit ^= 2;
	            if (arrow === 'right') bit ^= 4;
	            if (arrow === 'down') bit ^= 8;
	        }
	    } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                _iterator6.return();
	            }
	        } finally {
	            if (_didIteratorError6) {
	                throw _iteratorError6;
	            }
	        }
	    }

	    return bit;
	};

	Game_Map.prototype._setupCollisionArrow = function () {
	    var width = this.width();
	    var height = this.height();
	    var size = width * height;
	    var bit = 0;
	    var halfWidth = width / 2;
	    var halfHeight = height / 2;

	    if (this.isHalfTile()) {
	        size /= 4;
	    }

	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;

	    try {
	        for (var _iterator7 = this.tiledData.layers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	            var layerData = _step7.value;

	            if (!layerData.properties || !layerData.properties.collision) {
	                continue;
	            }

	            if (layerData.properties.collision !== "arrow" && layerData.properties.collision !== "tile-base") {
	                continue;
	            }

	            var level = parseInt(layerData.properties.level) || 0;
	            this._initializeMapLevel(level);
	            var arrowCollisionMap = this._arrowCollisionMap[level];
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;

	            try {
	                for (var _iterator8 = Array(size).keys()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var x = _step8.value;

	                    var realX = x;
	                    if (this.isHalfTile()) {
	                        realX = Math.floor(x / halfWidth) * width * 2 + x % halfWidth * 2;
	                    }

	                    if (layerData.properties.collision === "tile-base") {
	                        var tileproperties = this._getTileProperties(layerData.data[x]);
	                        if (!!tileproperties.arrowImpassable) {
	                            bit = this._getArrowBit(tileproperties.arrowImpassable);
	                            arrowCollisionMap[realX] = arrowCollisionMap[realX] ^ bit;
	                            if (this.isHalfTile()) {
	                                arrowCollisionMap[realX + 1] = arrowCollisionMap[realX + 1] ^ bit;
	                                arrowCollisionMap[realX + width] = arrowCollisionMap[realX + width] ^ bit;
	                                arrowCollisionMap[realX + width + 1] = arrowCollisionMap[realX + width + 1] ^ bit;
	                            }
	                        }
	                    } else if (!!layerData.data[x]) {
	                        if (!layerData.properties.arrowImpassable) {
	                            continue;
	                        }

	                        bit = this._getArrowBit(layerData.properties.arrowImpassable);

	                        arrowCollisionMap[realX] = arrowCollisionMap[realX] ^ bit;
	                        if (this.isHalfTile()) {
	                            arrowCollisionMap[realX + 1] = arrowCollisionMap[realX + 1] ^ bit;
	                            arrowCollisionMap[realX + width] = arrowCollisionMap[realX + width] ^ bit;
	                            arrowCollisionMap[realX + width + 1] = arrowCollisionMap[realX + width + 1] ^ bit;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                _iterator7.return();
	            }
	        } finally {
	            if (_didIteratorError7) {
	                throw _iteratorError7;
	            }
	        }
	    }
	};

	Game_Map.prototype._setupRegion = function () {
	    var width = this.width();
	    var height = this.height();
	    var size = width * height;
	    var halfWidth = width / 2;
	    var halfHeight = height / 2;

	    if (this.isHalfTile()) {
	        size /= 4;
	    }

	    var _iteratorNormalCompletion9 = true;
	    var _didIteratorError9 = false;
	    var _iteratorError9 = undefined;

	    try {
	        for (var _iterator9 = this.tiledData.layers[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	            var layerData = _step9.value;

	            if (!layerData.properties || !layerData.properties.regionId) {
	                continue;
	            }

	            var level = parseInt(layerData.properties.level) || 0;
	            this._initializeMapLevel(level);
	            var regionMap = this._regions[level];

	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;

	            try {
	                for (var _iterator10 = Array(size).keys()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var x = _step10.value;

	                    var realX = x;
	                    if (this.isHalfTile()) {
	                        realX = Math.floor(x / halfWidth) * width * 2 + x % halfWidth * 2;
	                    }

	                    if (layerData.properties.regionId === "tile-base") {
	                        var tileproperties = this._getTileProperties(layerData.data[x]);
	                        if (!!tileproperties.regionId) {
	                            regionMap[realX] = parseInt(tileproperties.regionId);
	                            if (this.isHalfTile()) {
	                                regionMap[realX + 1] = parseInt(tileproperties.regionId);;
	                                regionMap[realX + width] = parseInt(tileproperties.regionId);;
	                                regionMap[realX + width + 1] = parseInt(tileproperties.regionId);;
	                            }
	                        }
	                    } else if (!!layerData.data[x]) {
	                        regionMap[realX] = parseInt(layerData.properties.regionId);
	                        if (this.isHalfTile()) {
	                            regionMap[realX + 1] = parseInt(layerData.properties.regionId);
	                            regionMap[realX + width] = parseInt(layerData.properties.regionId);
	                            regionMap[realX + width + 1] = parseInt(layerData.properties.regionId);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError9 = true;
	        _iteratorError9 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                _iterator9.return();
	            }
	        } finally {
	            if (_didIteratorError9) {
	                throw _iteratorError9;
	            }
	        }
	    }
	};

	Game_Map.prototype._setupMapLevelChange = function () {
	    var width = this.width();
	    var height = this.height();
	    var size = width * height;
	    var halfWidth = width / 2;
	    var halfHeight = height / 2;

	    if (this.isHalfTile()) {
	        size /= 4;
	    }

	    var _iteratorNormalCompletion11 = true;
	    var _didIteratorError11 = false;
	    var _iteratorError11 = undefined;

	    try {
	        for (var _iterator11 = this.tiledData.layers[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	            var layerData = _step11.value;

	            if (!layerData.properties || !layerData.properties.toLevel) {
	                continue;
	            }

	            var level = parseInt(layerData.properties.level) || 0;
	            this._initializeMapLevel(level);
	            var levelChangeMap = this._mapLevelChange[level];

	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;

	            try {
	                for (var _iterator12 = Array(size).keys()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var x = _step12.value;

	                    var realX = x;
	                    var toLevel = parseInt(layerData.properties.toLevel);
	                    if (this.isHalfTile()) {
	                        realX = Math.floor(x / halfWidth) * width * 2 + x % halfWidth * 2;
	                    }

	                    if (!!layerData.data[x]) {
	                        levelChangeMap[realX] = toLevel;
	                        if (this.isHalfTile()) {
	                            levelChangeMap[realX + 1] = toLevel;
	                            levelChangeMap[realX + width] = toLevel;
	                            levelChangeMap[realX + width + 1] = toLevel;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError11 = true;
	        _iteratorError11 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                _iterator11.return();
	            }
	        } finally {
	            if (_didIteratorError11) {
	                throw _iteratorError11;
	            }
	        }
	    }
	};

	Game_Map.prototype._setupReflection = function () {
	    var _iteratorNormalCompletion13 = true;
	    var _didIteratorError13 = false;
	    var _iteratorError13 = undefined;

	    try {
	        for (var _iterator13 = this.tiledData.layers[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	            var layerData = _step13.value;

	            if (layerData.type !== "objectgroup") {
	                continue;
	            }

	            if (!layerData.properties) {
	                continue;
	            }

	            if (layerData.properties.reflectionCast === undefined) {
	                continue;
	            }

	            var reflectionCast = layerData.properties.reflectionCast;
	            var reflectionMask = layerData.properties.reflectionMask;
	            var reflectionOpacity = layerData.properties.reflectionOpacity || 255;
	            var reflectionOffset = layerData.properties.reflectionOffset || 0;

	            var _iteratorNormalCompletion14 = true;
	            var _didIteratorError14 = false;
	            var _iteratorError14 = undefined;

	            try {
	                for (var _iterator14 = layerData.objects[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                    var obj = _step14.value;

	                    var rect = {
	                        x: obj.x,
	                        y: obj.y,
	                        width: obj.width,
	                        height: obj.height
	                    };

	                    this._reflection.push({
	                        rect: rect,
	                        reflectionCast: reflectionCast,
	                        reflectionMask: reflectionMask,
	                        reflectionOpacity: reflectionOpacity,
	                        reflectionOffset: reflectionOffset
	                    });
	                }
	            } catch (err) {
	                _didIteratorError14 = true;
	                _iteratorError14 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                        _iterator14.return();
	                    }
	                } finally {
	                    if (_didIteratorError14) {
	                        throw _iteratorError14;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError13 = true;
	        _iteratorError13 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                _iterator13.return();
	            }
	        } finally {
	            if (_didIteratorError13) {
	                throw _iteratorError13;
	            }
	        }
	    }
	};

	Game_Map.prototype.isOnReflection = function (character) {
	    var mapX = character._realX * this.tileWidth();
	    var mapY = character._realY * this.tileHeight();

	    if (!this.isTiledMap()) {
	        return false;
	    }

	    if (this._reflection.length === 0) {
	        return false;
	    }

	    var _iteratorNormalCompletion15 = true;
	    var _didIteratorError15 = false;
	    var _iteratorError15 = undefined;

	    try {
	        for (var _iterator15 = this._reflection[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	            var reflection = _step15.value;

	            var rect = reflection.rect;
	            var inX = mapX >= rect.x && mapX <= rect.x + rect.width;
	            var inY = mapY >= rect.y && mapY <= rect.y + rect.height;

	            if (inX && inY) {
	                return true;
	            }
	        }
	    } catch (err) {
	        _didIteratorError15 = true;
	        _iteratorError15 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                _iterator15.return();
	            }
	        } finally {
	            if (_didIteratorError15) {
	                throw _iteratorError15;
	            }
	        }
	    }

	    return false;
	};

	Game_Map.prototype.getReflections = function (character) {
	    var mapX = character._realX * this.tileWidth();
	    var mapY = character._realY * this.tileHeight();

	    var result = [];

	    var _iteratorNormalCompletion16 = true;
	    var _didIteratorError16 = false;
	    var _iteratorError16 = undefined;

	    try {
	        for (var _iterator16 = this._reflection[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	            var reflection = _step16.value;

	            var rect = reflection.rect;
	            var inX = mapX >= rect.x && mapX <= rect.x + rect.width;
	            var inY = mapY >= rect.y && mapY <= rect.y + rect.height;

	            if (inX && inY) {
	                result.push(reflection);
	            }
	        }
	    } catch (err) {
	        _didIteratorError16 = true;
	        _iteratorError16 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion16 && _iterator16.return) {
	                _iterator16.return();
	            }
	        } finally {
	            if (_didIteratorError16) {
	                throw _iteratorError16;
	            }
	        }
	    }

	    return result;
	};

	Game_Map.prototype._setupTiledEvents = function () {
	    var _iteratorNormalCompletion17 = true;
	    var _didIteratorError17 = false;
	    var _iteratorError17 = undefined;

	    try {
	        for (var _iterator17 = this.tiledData.layers[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	            var layerData = _step17.value;

	            if (layerData.type !== "objectgroup") {
	                continue;
	            }

	            var _iteratorNormalCompletion18 = true;
	            var _didIteratorError18 = false;
	            var _iteratorError18 = undefined;

	            try {
	                for (var _iterator18 = layerData.objects[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
	                    var object = _step18.value;

	                    if (!object.properties) {
	                        continue;
	                    }

	                    if (!object.properties.eventId) {
	                        continue;
	                    }

	                    var eventId = parseInt(object.properties.eventId);
	                    var event = this._events[eventId];
	                    if (!event) {
	                        continue;
	                    }
	                    var x = Math.floor(object.x / this.tileWidth());
	                    var y = Math.floor(object.y / this.tileHeight());
	                    if (this.isHalfTile()) {
	                        x += 1;
	                        y += 1;
	                    }

	                    event.locate(x, y);
	                    if (event.loadLocation) {
	                        event.loadLocation();
	                    }
	                }
	            } catch (err) {
	                _didIteratorError18 = true;
	                _iteratorError18 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion18 && _iterator18.return) {
	                        _iterator18.return();
	                    }
	                } finally {
	                    if (_didIteratorError18) {
	                        throw _iteratorError18;
	                    }
	                }
	            }
	        }
	    } catch (err) {
	        _didIteratorError17 = true;
	        _iteratorError17 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion17 && _iterator17.return) {
	                _iterator17.return();
	            }
	        } finally {
	            if (_didIteratorError17) {
	                throw _iteratorError17;
	            }
	        }
	    }
	};

	Game_Map.prototype.isHalfTile = function () {
	    var pluginParams = YED_TiledParameters;
	    return pluginParams["Half-tile movement"].toLowerCase() === "true";
	};

	Game_Map.prototype.tileWidth = function () {
	    var tileWidth = this.tiledData.tilewidth;
	    if (this.isHalfTile()) {
	        tileWidth /= 2;
	    }
	    return tileWidth;
	};

	Game_Map.prototype.tileHeight = function () {
	    var tileHeight = this.tiledData.tileheight;
	    if (this.isHalfTile()) {
	        tileHeight /= 2;
	    }
	    return tileHeight;
	};

	Game_Map.prototype.width = function () {
	    var width = this.tiledData.width;
	    if (this.isHalfTile()) {
	        width *= 2;
	    }
	    return width;
	};

	Game_Map.prototype.height = function () {
	    var height = this.tiledData.height;
	    if (this.isHalfTile()) {
	        height *= 2;
	    }
	    return height;
	};

	var _regionId = Game_Map.prototype.regionId;
	Game_Map.prototype.regionId = function (x, y) {
	    if (!this.isTiledMap()) {
	        return _regionId.call(this, x, y);
	    }

	    var index = x + this.width() * y;
	    var regionMap = this._regions[this.currentMapLevel];

	    return regionMap[index];
	};

	var _isPassable = Game_Map.prototype.isPassable;
	Game_Map.prototype.isPassable = function (x, y, d) {
	    if (!this.isTiledMap()) {
	        return _isPassable.call(this, x, y, d);
	    }

	    var index = x + this.width() * y;
	    var arrows = this._arrowCollisionMap[this.currentMapLevel];

	    if (d === 4) {
	        if (!(arrows[index] & 1)) {
	            return false;
	        }
	    }

	    if (d === 8) {
	        if (!(arrows[index] & 2)) {
	            return false;
	        }
	    }

	    if (d === 6) {
	        if (!(arrows[index] & 4)) {
	            return false;
	        }
	    }

	    if (d === 2) {
	        if (!(arrows[index] & 8)) {
	            return false;
	        }
	    }

	    return this._collisionMap[this.currentMapLevel][index] === 0;
	};

	Game_Map.prototype.checkMapLevelChanging = function (x, y) {
	    var mapLevelChange = this._mapLevelChange[this.currentMapLevel];
	    var id = y * this.width() + x;
	    if (mapLevelChange[id] < 0) {
	        return false;
	    }
	    this.currentMapLevel = mapLevelChange[id];
	    return true;
	};

/***/ },

/***/ 77:
/***/ function(module, exports) {

	"use strict";

	var _initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function () {
	    _initMembers.call(this);
	    this.reflections = [];
	};

	Game_CharacterBase.prototype.screenZ = function () {
	    var pluginParams = YED_TiledParameters;
	    if (this._priorityType == 0) {
	        return parseInt(pluginParams["Z - Below Player"]);
	    }
	    if (this._priorityType == 2) {
	        return parseInt(pluginParams["Z - Above Player"]);
	    }
	    return parseInt(pluginParams["Z - Player"]);
	};

	var _distancePerFrame = Game_CharacterBase.prototype.distancePerFrame;
	Game_CharacterBase.prototype.distancePerFrame = function () {
	    var distance = _distancePerFrame.call(this);
	    return distance * (48 / Math.min($gameMap.tileWidth(), $gameMap.tileHeight()));
	};

	var _update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function () {
	    _update.call(this);
	    this.updateReflection();
	};

	Game_CharacterBase.prototype.updateReflection = function () {
	    if (!$gameMap.isOnReflection(this)) {
	        this.reflections = [];
	        return;
	    }
	    this.reflections = $gameMap.getReflections(this);
	};

/***/ },

/***/ 78:
/***/ function(module, exports) {

	"use strict";

	var _checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
	Game_Player.prototype.checkEventTriggerHere = function (triggers) {
	    _checkEventTriggerHere.call(this, triggers);
	    this._checkMapLevelChangingHere();
	};

	Game_Player.prototype._checkMapLevelChangingHere = function () {
	    $gameMap.checkMapLevelChanging(this.x, this.y);
	};

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _TiledTilemap = __webpack_require__(75);

	var _ReflectionMask = __webpack_require__(80);

	var _Sprite_CharacterReflect = __webpack_require__(81);

	var _createTilemap = Spriteset_Map.prototype.createTilemap;
	Spriteset_Map.prototype.createTilemap = function () {
	    if (!$gameMap.isTiledMap()) {
	        _createTilemap.call(this);
	        return;
	    }
	    this._tilemap = new _TiledTilemap.TiledTilemap($gameMap.tiledData);
	    this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
	    this._tilemap.verticalWrap = $gameMap.isLoopVertical();
	    this.loadTileset();
	    this._baseSprite.addChild(this._tilemap);
	    this._reflectSurfaceSprite = new Sprite();
	    this.addChild(this._reflectSurfaceSprite);
	    this.createReflectionMask();
	};

	var _loadTileset = Spriteset_Map.prototype.loadTileset;
	Spriteset_Map.prototype.loadTileset = function () {
	    if (!$gameMap.isTiledMap()) {
	        _loadTileset.call(this);
	        return;
	    }

	    var i = 0;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = $gameMap.tiledData.tilesets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var tileset = _step.value;

	            this._tilemap.bitmaps[i] = ImageManager.loadParserTileset(tileset.image, 0);
	            i++;
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    this._tilemap.refreshTileset();
	    this._tileset = $gameMap.tiledData.tilesets;
	};

	var _update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function () {
	    _update.call(this);
	    this._updateHideOnLevel();
	    this._updateReflectSurface();
	};

	Spriteset_Map.prototype.updateTileset = function () {
	    if (this._tileset !== $gameMap.tiledData.tilesets) {
	        this.loadTileset();
	    }
	};

	Spriteset_Map.prototype._updateHideOnLevel = function () {
	    this._tilemap.hideOnLevel($gameMap.currentMapLevel);
	};

	var _isReflectSurface = function _isReflectSurface(layerData) {
	    var properties = layerData.properties;
	    return !!properties && properties.reflectionSurface;
	};

	Spriteset_Map.prototype.createReflectionMask = function () {
	    var tiledData = $gameMap.tiledData;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = tiledData.layers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var layerData = _step2.value;

	            if (!_isReflectSurface(layerData)) {
	                continue;
	            }

	            var mask = (0, _ReflectionMask.newRectMask)($gameMap.width() * $gameMap.tileWidth(), $gameMap.height() * $gameMap.tileHeight(), layerData);

	            // this._reflectSurfaceSprite.addChild(mask);
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	};

	var _createCharacters = Spriteset_Map.prototype.createCharacters;
	Spriteset_Map.prototype.createCharacters = function () {
	    _createCharacters.call(this);
	    $gameMap.events().forEach(function (event) {
	        var sprite = new _Sprite_CharacterReflect.Sprite_CharacterReflect(event);
	        this._characterSprites.push(sprite);
	        this._tilemap.addChild(sprite);
	    }, this);
	    $gameMap.vehicles().forEach(function (vehicle) {
	        var sprite = new _Sprite_CharacterReflect.Sprite_CharacterReflect(vehicle);
	        this._characterSprites.push(sprite);
	        this._tilemap.addChild(sprite);
	    }, this);
	    $gamePlayer.followers().reverseEach(function (follower) {
	        var sprite = new _Sprite_CharacterReflect.Sprite_CharacterReflect(follower);
	        this._characterSprites.push(sprite);
	        this._tilemap.addChild(sprite);
	    }, this);
	    var sprite = new _Sprite_CharacterReflect.Sprite_CharacterReflect($gamePlayer);
	    this._characterSprites.push(sprite);
	    this._tilemap.addChild(sprite);
	};

	Spriteset_Map.prototype._updateReflectSurface = function () {
	    if (!this._reflectSurfaceSprite) {
	        return;
	    }
	    this._reflectSurfaceSprite.x = -$gameMap.displayX() * $gameMap.tileWidth();
	    this._reflectSurfaceSprite.y = -$gameMap.displayY() * $gameMap.tileHeight();
	};

/***/ },

/***/ 80:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var newRectMask = exports.newRectMask = function newRectMask(mapWidth, mapHeight, layerData) {
	    var maskRect = new PIXI.Graphics();
	    var obj = layerData.objects[0];
	    maskRect.beginFill(0xffffff);
	    maskRect.drawRect(0, 0, obj.width, obj.height);
	    maskRect.endFill();

	    var maskTexture = PIXI.RenderTexture.create(mapWidth, mapHeight);
	    var maskSprite = new PIXI.Sprite(maskTexture);
	    maskRect.position.set(obj.x, obj.y);
	    Graphics._renderer.render(maskRect, maskTexture, false, null, false);

	    return maskSprite;
	};

/***/ },

/***/ 81:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sprite_CharacterReflect = exports.Sprite_CharacterReflect = function (_Sprite_Character) {
	    _inherits(Sprite_CharacterReflect, _Sprite_Character);

	    function Sprite_CharacterReflect() {
	        _classCallCheck(this, Sprite_CharacterReflect);

	        return _possibleConstructorReturn(this, (Sprite_CharacterReflect.__proto__ || Object.getPrototypeOf(Sprite_CharacterReflect)).apply(this, arguments));
	    }

	    _createClass(Sprite_CharacterReflect, [{
	        key: "initMembers",
	        value: function initMembers() {
	            _get(Sprite_CharacterReflect.prototype.__proto__ || Object.getPrototypeOf(Sprite_CharacterReflect.prototype), "initMembers", this).call(this);
	            this.visible = false;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            _get(Sprite_CharacterReflect.prototype.__proto__ || Object.getPrototypeOf(Sprite_CharacterReflect.prototype), "update", this).call(this);
	            this.updateReflect();
	        }
	    }, {
	        key: "updateReflect",
	        value: function updateReflect() {
	            this.visible = this._character.reflections.length > 0;
	            var reflection = this._character.reflections[0];
	            if (!reflection) {
	                return;
	            }
	            this.scale.y = reflection.reflectionCast > 0 ? -1 : 1;
	            this.opacity = reflection.reflectionOpacity || 255;
	        }
	    }, {
	        key: "updatePosition",
	        value: function updatePosition() {
	            var reflection = this._character.reflections[0];
	            this.x = this._character.screenX();
	            this.y = this._character.screenY();
	            this.z = this._character.screenZ();
	            if (!reflection) {
	                return;
	            }
	            this.y += $gameMap.tileHeight() * reflection.reflectionCast;
	            if (reflection.reflectionCast > 0) {
	                this.y -= $gameMap.tileHeight();
	            }
	            this.y += reflection.reflectionOffset;
	        }
	    }]);

	    return Sprite_CharacterReflect;
	}(Sprite_Character);

/***/ }

/******/ });