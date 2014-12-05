# Before After Component

This will let you use to images and using a slider apply reveal one of the images. This will give the before/after illusion.

  - Compatible with all modern browsers including Android and iOS mobile and tablet devices.
  - Uses CSS3 transitions to ensure the performance and compatibility of the animations.
  - Component is designed to fill the width and height of the window so it will work fine in iframes.



Version
-----------

0.1.0


Bugs
-----------
* No bug reported so far.


Notes
-----------
* Please run the example in APACHE or NODE


Configuration
-----------

* You can customize the before and after images, slider, loading spinner and overlay bg by modifying the configuration file "config.js" located on the root.
* You can also change the config file and reload the component

```javascript

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
    before: "assets/img_0.jpg",
    after: "assets/img_1.jpg",
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

```


How to use:
--------------

Just call the load() method after chainging the configuration or at load time.

```javascript

APP.load();

```

---

License
----

Created By Ian Calderon for Say Media. For any feedback or bug reports please contact me: icalderon@saymedia.com

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;