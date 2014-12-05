
/*****************************************************************************************
 * IMAGE FETCHER
 *****************************************************************************************/
(function(window, document, _app, $, undefined) {

var
/*========================================= Private =========================================*/
buildClass = function(parent, autoload){

	$.bindContext(this, "imageLoaded");

	this.parent = parent;

	buildConfig.call(this);

	if (autoload === true) {
		loadImages.call(this);
	}
},
buildConfig = function(){
	var imgConf = _app.userConf.images,
		sliderConf = _app.userConf.slider;

	this.imageURLs.before = imgConf.before;
	this.imageURLs.after = imgConf.after;

	if (sliderConf.tab.img) {
		this.imageURLs.tab = sliderConf.tab.img;
	}

	if (sliderConf.tab.img_on) {
		this.imageURLs.tab_on = sliderConf.tab.img_on;
	}

	if (sliderConf.rail.img) {
		this.imageURLs.rail = sliderConf.rail.img;
	}
	
},
loadImages = function(){
	var key, count = 0;

	for(key in this.imageURLs){
		if (this.imageURLs[key]) {
			this.images[key] = new Image();
			this.images[key].addEventListener("load", this.imageLoaded);
			this.images[key].addEventListener("error", this.onLoadError);
			this.images[key].src = this.imageURLs[key];
			count++;
		}
	}
	this.imageCount = count;
};


/*========================================= CLASS =========================================*/
var _fetch = function(parent, autoload){
	buildClass.apply(this, arguments);
};

_fetch.prototype ={
	imageURLs: {},
	images: {},
	imageCount: 0,
	loadedImageCount:0,
	constructor: _fetch,
	imageLoaded: function(){
		this.loadedImageCount++;

		if (this.loadedImageCount === this.imageCount) {
			this.onAllImagesLoaded();
		}
	},
	onLoadError: function(error){
		console.log("Error Loading Image: ", error);
	},
	onAllImagesLoaded: function(){
		this.parent.onAllImagesLoaded();
	},
	reload: function(){

		// reset values
		this.imageURLs = {};
		this.images = {};
		this.imageCount = 0;
		this.loadedImageCount = 0;

		// fetch images
		buildConfig.call(this);
		loadImages.call(this);
	}
};


_app.Classes.Fetch = _fetch;

}(this, document, APP, c$));