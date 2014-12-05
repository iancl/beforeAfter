
/*****************************************************************************************
 * LOADING SCREEN
 *****************************************************************************************/
(function(window, document, _app, $, Spinner, undefined) {

var
/*========================================= Private /*=========================================*/

// const
ANIMATION_DURATION = 200,
VISIBLE_DURATION = 300,
SHOW_CLASS = "on",
RENDER_CLASS = "show",

// other
 _el, _spinner, _isShowing,


// FN
BuildClass = function(conf) {

	this.conf = conf || {};

	_isShowing = false;
	conf.spinnerColor = conf.spinnerColor || "#fff";
	conf.bgColor = conf.bgColor || "rgba(0,0,0,0.7)";
	_el = $.q("#loadingOverlay");
	_el.setCss("background-color:" + conf.bgColor + ";");

	_spinner = new Spinner({
		length: 10, // The length of each line
		width: 4, // The line thickness
		radius: 15, // The radius of the inner circle
		color: conf.spinnerColor, // #rgb or #rrggbb or array of colors
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	});

	_isShowing = true;
	spin();
},
spin = function(){
	_spinner.spin(_el.getElement());
},
stopSpinning = function(){
	_spinner.stop();
};

/*========================================= CLASS =========================================*/
var loading = function(conf) {
	BuildClass.apply(this, arguments);
};

loading.prototype = {
	constructor: loading,
	show: function(fn){
		if (_isShowing === true) return;
		_isShowing = true;

		_el.addClass(RENDER_CLASS);

		$.defer(function(){
			spin();
			_el.addClass(SHOW_CLASS);
		},0);

		$.defer(function(){
			fn();
		}, ANIMATION_DURATION);

	},
	hide: function(fn){
		if (_isShowing === false || this.conf.test === true ) return;
		

		$.defer(function(){
			_el.removeClass(SHOW_CLASS);
		}, VISIBLE_DURATION);

		$.defer(function(){
			_el.removeClass(RENDER_CLASS);
			stopSpinning();
			_isShowing = false;
			fn();
		}, ANIMATION_DURATION+VISIBLE_DURATION);
	},
	isVisible: function(){
		return _isShowing;
	}
};

// sharing
_app.Loading = new loading(_app.userConf.loader);


}(this, document, APP, c$, Spinner));