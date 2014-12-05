/**
 * CONFIGURATION
 */

// inside any styles object you can add standard css.
// image location can be local or external

var APP_CONF = {
	loader: {
		bgColor: "rgba(0,0,0,1)",
		spinnerColor: "white",
		test: false
	},
	container: {
		// styles: {}
	},
	images: {
		before: "assets/Gardenista_TudorHouse_0.jpg",
		after: "assets/Gardenista_TudorHouse_1.jpg",
	},
	slider: {
		tab: {
			img: "assets/tab.png",
			img_on: "assets/tab_on.png"
			// styles: {}
		},
		rail:{
			width: 4,
			styles: {
				"background-color": "rgba(255,255,255,0.9)",
			}
		}
	}
};