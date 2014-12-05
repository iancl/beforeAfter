// declaring namespace
var APP = {};

/*****************************************************************************************
 * APP
 *****************************************************************************************/
(function(window, document, userConf, _app, $, undefined) {

/*========================================= GLOBAL =========================================*/
_app.userConf = userConf;
_app.Classes = {};
_app.author = "Ian Calderon";
_app.version = "0.1.2";

var
/*========================================= LOCAL =========================================*/
INITIAL_ANIMATION_DURATION = 600,
_self,
_container,
_beforeContainer,
_afterContainer,
_slider,
_tab,
_rail,
_leftBound,
_rightBound,
_bounds = {l:0, r:0},
_sizes = {
	tab:{
		w: 0,
		h: 0
	},
	win: {
		w: 0,
		h: 0
	}
},

// fn
buildClass = function() {

	this.Fetcher = new _app.Classes.Fetch(this, false);
	initialSetup();
	this.setListeners();
},
getWindowSize = function() {
	var winW, winH;

	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode == 'CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}

	_sizes.win.w = winW;
	_sizes.win.h = winH;
},
onWindowResize = function() {
	getWindowSize();
	resizeElements();
},
resizeElements = function(){
	var css = "width:"+_sizes.win.w+"px; height:"+_sizes.win.h+"px;",
		bgSize = "background-size: "+_sizes.win.w+"px "+_sizes.win.h+"px;";

	_container.setCss(css);
	_beforeContainer.setCss(css+bgSize);
	_afterContainer.setCss(bgSize);
	_tab.setCss("top:"+((_sizes.win.h / 2) - (_sizes.tab.h / 2))+"px;");
	_slider.setCss("height:"+_sizes.win.h+"px;");
},
initialSetup = function() {
	var tab, rail, slider;

	_container = $.q("#container").setCss(generateCssText(userConf.container.styles));
	_beforeContainer = $.q("#beforeContainer");
	_afterContainer = $.q("#afterContainer");

	slider = document.createElement("div");
	slider.id = "slider";
	_slider = $.q(slider);
	_container.appendHtml(_slider);

	tab = document.createElement("div");
	tab.id = "tab";
	_tab = $.q(tab);
	_slider.appendHtml(_tab);

	rail = document.createElement("div");
	rail.id = "rail";
	_rail = $.q(rail);
	_slider.appendHtml(_rail);


	slider = null;
	tab = null;
	rail = null;
},
updateImages = function() {

	var tabImg = this.Fetcher.images.tab,
		railImg = this.Fetcher.images.rail,
		beforeImg = this.Fetcher.images.before,
		afterImg = this.Fetcher.images.after,
		tabPos = (userConf.container.height / 2) - (this.Fetcher.images.tab.height / 2);

	_sizes.tab.w = tabImg.width;
	_sizes.tab.h = tabImg.height;

	_beforeContainer.setCss(" background-image:url(" + beforeImg.src + ");");
	_afterContainer.setCss(" background-image:url(" + afterImg.src + ");");
	_slider.setCss("width:" + tabImg.width + "px;");

	if (tabImg) {
		_tab.setCss("width:" + tabImg.width + "px; height:" + tabImg.height + "px; background-image:url(" + tabImg.src + "); background-size: " + tabImg.width + "px " + tabImg.height + "px;");
	}

	// override existing styles if necessary
	_tab.setCss(generateCssText(userConf.slider.tab.styles));
	_rail.setCss("width:" + userConf.slider.rail.width + "px; margin-left:" + ((userConf.slider.rail.width / 2) * -1) + "px;" + generateCssText(userConf.slider.rail.styles));

},
generateCssText = function(stylesObject) {

	var key, value, css = "";

	if (typeof(stylesObject) !== "undefined") {

		for (key in stylesObject) {
			value = key + ":" + stylesObject[key] + ";";
			css += value;
		}

	}

	return css;
};

/*========================================= CLASS =========================================*/
var _main = function() {
	buildClass.apply(this, arguments);
};

_main.prototype = {
	constructor: _main,
	initialAnimationComplete: false,
	sliderPos: 0,
	initialize: function() {

		var self = this;

		updateImages.call(this);
		onWindowResize();
		this.positionSlider(0, true);


		_app.Loading.hide(function(){
			self.initialAnim();
			self = null;
		});
		

	},
	initialAnim: function(){

		var self;

		self = this;
			
		_afterContainer.addClass("initial");
		_slider.addClass("initial");

		$.defer(function(){
			self.positionSlider(_sizes.win.w / 2, true);
		},0);

		$.defer(function(){
			self.initialAnimationComplete = true;
			_afterContainer.removeClass("initial");
			_slider.removeClass("initial");
			self = null;
		}, INITIAL_ANIMATION_DURATION);

		
	},
	setListeners: function() {

		$.bindContext(this, "onWindowResize");

		Sense.onTouchMove({
			context: this,
			distance: 1,
			selector: "#container",
			allowVerticalScrolling: true,
			onLeft: this.positionSlider,
			onRight: this.positionSlider,
			onTouchstart: function(data) {

				if (this.initialAnimationComplete === false) {
					_afterContainer.removeClass("initial");
					_slider.removeClass("initial");
				}
				

				this.positionSlider(data.startX, true);
				this.activateTab();
			},
			onTouchend: function() {
				this.deactivateTab();
			}
		});

		// on window resize
		window.addEventListener("resize", this.onWindowResize);

		// orientation change
		window.addEventListener("orientationchange", this.onWindowResize);
	},
	activateTab: function(){
		if (this.Fetcher.images.tab_on) {
			_tab.setCss("background-image:url("+this.Fetcher.images.tab_on.src+"); cursor: ew-resize;");
			_container.setCss("cursor: ew-resize;");
		}
	},
	deactivateTab: function(){
		if (this.Fetcher.images.tab_on) {
			_tab.setCss("background-image:url("+this.Fetcher.images.tab.src+"); ursor: pointer;");
			_container.setCss("cursor: pointer;");
		}
	},
	onWindowResize: function(){
		onWindowResize();
		this.updateAllElements();
	},
	onAllImagesLoaded: function() {
		this.initialize();
	},
	updateAllElements: function(){
		var x = this.sliderPos * _sizes.win.w / 100;

		// calculating boundaries
		if (x < 0) x = 0;
		if (x > (_sizes.win.w - _sizes.tab.w)) x = (_sizes.win.w - _sizes.tab.w);
		
		_afterContainer.setCss("width:" + x + "px;");
		_slider.setCss("left:" + (x - _sizes.tab.w/2) + "px;");
	},
	positionSlider: function(pos, override) {

		// storing value to calculate pos after resizing
		this.sliderPos =  (pos * 100) / _sizes.win.w;

		// calculating boundaries
		if (pos < 0) pos = 0;
		if (pos > (_sizes.win.w)) pos = (_sizes.win.w);

		_afterContainer.setCss("width:" + pos + "px;");
		_slider.setCss("left:" + (pos - _sizes.tab.w/2) + "px;");
	}
};


/*========================================= LOCAL INSTANTIATION AND API=========================================*/
function onWindowReady() {
	_self = new _main();
}

// instantiate on load
window.addEventListener("load", onWindowReady);


// will start or reload the component with using the config in config.js
_app.reload = _app.load = function(){
	_self.initialAnimationComplete = false;

	if (_app.Loading.isVisible() === true) {
			_self.Fetcher.reload();
	} else {
		_app.Loading.show(function(){
			_self.Fetcher.reload();
		});
	}
};




}(this, document, APP_CONF, APP, c$));