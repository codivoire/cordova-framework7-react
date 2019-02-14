/**
 * The Platform service can be used to get information about your current device.
 * You can get all of the platforms associated with the device using the platforms method,
 * including whether the app is being viewed from a tablet, if it's on a mobile device or browser,
 * and the exact platform (iOS, Android, etc). You can also get the orientation of the device
 */
class Platform {
  constructor() {
    this.heightCached = window.innerHeight;
    this.widthCached = window.innerWidth;
    this.navigator = window.navigator;
    this.userAgent = this.navigator.userAgent;

    this.platformName = null; // just the name, like iOS or Android
    this.platformVersion = null; // a float of the major and minor, like 7.1
    this.readyCallbacks = [];
    this.backButtonActions = {};
    this.nextId = 0;
    this.windowLoadListenderAttached;
    this.platformReadyTimer = 2000;

    this.isReady = false;

    this.IOS = "ios";
    this.ANDROID = "android";
    this.WINDOWS_PHONE = "windowsphone";
    this.EDGE = "edge";
    this.CROSSWALK = "crosswalk";

    if (document.readyState === "complete") {
      this.onWindowLoad();
    } else {
      this.windowLoadListenderAttached = true;
      window.addEventListener("load", () => this.onWindowLoad(), false);
    }
  }

  /**
   * Get the userAgent of the platform’s
   *
   * @returns {string} What User Agent is.
   */
  ua() {
    return this.userAgent;
  }

  /**
   * Return the current device (given by cordova).
   *
   * @returns {object} The device object.
   */
  device() {
    return window.device || {};
  }

  /**
   * Return the name of the current platform.
   *
   * @returns {string} The name of the current platform.
   */
  name() {
    // singleton to get the platform name
    if (this.platformName === null) {
      this.setPlatform(this.device().platform);
    }

    return this.platformName;
  }

  /**
   * Return the version of the current device platform.
   *
   * @returns {number} The version of the current device platform.
   */
  version() {
    if (this.platformVersion === null) {
      this.setVersion(this.device().version);
    }

    return this.platformVersion;
  }

  /**
   * Gets the height of the platform’s viewport using window.innerHeight.
   * Using this method is preferred since the dimension is a cached value,
   * which reduces the chance of multiple and expensive DOM reads.
   *
   * @returns {number}
   */
  height() {
    return this.heightCached;
  }

  /**
   * Gets the width of the platform’s viewport using window.innerWidth.
   * Using this method is preferred since the dimension is a cached value,
   * which reduces the chance of multiple and expensive DOM reads.
   *
   * @returns {number}
   */
  width() {
    return this.widthCached;
  }

  /**
   * Returns true if the app is in landscape mode.
   *
   * @returns {boolean}
   */
  isLandscape() {
    if (
      screen.orientation &&
      Object.prototype.hasOwnProperty.call(window, "onorientationchange")
    ) {
      return screen.orientation.type.includes("landscape");
    }

    return window.innerHeight / window.innerWidth < 1;
  }

  /**
   * Returns true if the app is in portait mode.
   *
   * @returns {boolean}
   */
  isPortrait() {
    if (
      screen.orientation &&
      Object.prototype.hasOwnProperty.call(window, "onorientationchange")
    ) {
      return screen.orientation.type.includes("portrait");
    }

    return window.innerHeight / window.innerWidth > 1;
  }

  /**
   * Depending on the platform the user is on, is(platformName) will return true or false.
   * Note that the same app can return true for more than one platform name.
   * For example, an app running from an iPad would return true for the platform names:
   * mobile, ios, ipad, and tablet. Additionally, if the app was running from Cordova then
   * cordova would be true, and if it was running from a web browser on the iPad then
   * mobileweb would be true.
   *
   * @param {string} needle The platform name
   * @returns {boolean} true/false based on platform.
   */
  is(needle) {
    const detect = this.detect();

    if (needle == "cordova") {
      return typeof window.cordova != "undefined";
    }

    if (needle == "webview") {
      return detect.isWebView();
    }

    if (needle == "desktop") {
      return !detect.tablet() && !detect.mobile();
    }

    if (needle == "tablet") {
      return detect.tablet();
    }

    if (needle == "mobile") {
      return detect.mobile();
    }

    if (needle == "ios") {
      return detect.ios();
    }

    if (needle == "iphone") {
      return detect.iphone();
    }

    if (needle == "ipod") {
      return detect.ipod();
    }

    if (needle == "ipad") {
      return detect.ipad();
    }

    if (needle == "android") {
      return detect.android();
    }

    if (needle == "windows") {
      return detect.windows();
    }
  }

  /**
   * Event fires when the platform is ready and native functionality can be called.
   * If the app is running from within a web browser, then the promise will resolve when the DOM is ready.
   * When the app is running from an application engine such as Cordova,
   * then the promise will resolve when Cordova triggers the deviceready event.
   *
   * @param {function} fn
   */
  ready(fn) {
    this.isReady ? fn() : this.readyCallbacks.push(fn);
  }

  /**
   * Add Cordova event listeners, such as `pause`, `resume`, `volumedownbutton`, `batterylow`, `offline`, etc.
   * More information about available event types can be found in
   * [Cordova's event documentation](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
   *
   * @param {string} type Cordova [event type](https://cordova.apache.org/docs/en/latest/cordova/events/events.html).
   * @param {function} fn Called when the Cordova event is fired.
   * @returns {function} Returns a deregistration function to remove the event listener.
   */
  on(type, fn) {
    this.ready(() => {
      document.addEventListener(type, fn, false);
    });

    return () => {
      this.ready(() => {
        document.removeEventListener(type, fn);
      });
    };
  }

  /**
   * The back button event is triggered when the user presses the native platform’s back button,
   * also referred to as the “hardware” back button. This event is only used within Cordova apps
   * running on Android and Windows platforms. This event is not fired on iOS since iOS
   * doesn’t come with a hardware back button in the same sense an Android or Windows device does.
   *
   * @param {function} fn Called when the back button is pressed, if this listener is the highest priority.
   * @param {number} priority Only the highest priority will execute.
   * @param {*=} actionId The id to assign this action. Default: a random unique id.
   * @returns {function} A function that, when called, will deregister this backButtonAction.
   */
  registerBackButtonAction(fn, priority, actionId) {
    if (!this._hasBackButtonHandler) {
      this.backButtonActions = {};

      this.onHardwareBackButton(e => {
        let priorityAction, actionId;

        for (actionId in this.backButtonActions) {
          if (
            !priorityAction ||
            this.backButtonActions[actionId].priority >= priorityAction.priority
          ) {
            priorityAction = this.backButtonActions[actionId];
          }
        }

        if (priorityAction) {
          priorityAction.fn(e);
          return priorityAction;
        }
      });

      this._hasBackButtonHandler = true;
    }

    let action = {
      id: actionId ? actionId : this.nextUid(),
      priority: priority ? priority : 0,
      fn: fn
    };

    this.backButtonActions[action.id] = action;

    // return a function to de-register this back button action
    return () => {
      delete this.backButtonActions[action.id];
    };
  }

  /**
   * Some platforms have a hardware back button, so this is one way to bind to it.
   *
   * @param {function} callback the callback to trigger when this event occurs
   */
  onHardwareBackButton(fn) {
    this.ready(e => {
      document.addEventListener("backbutton", fn, false);
    });
  }

  /**
   * Remove an event listener for the backbutton.
   *
   * @param {function} callback The listener function that was originally bound.
   */
  offHardwareBackButton(fn) {
    this.ready(e => {
      document.removeEventListener("backbutton", fn);
    });
  }

  /**
   * Close an app on Android or Windows
   *
   * @name Platform#exitApp
   */
  exitApp() {
    this.ready(e => {
      navigator.app && navigator.app.exitApp && navigator.app.exitApp();
    });
  }

  /**
   * @private
   */
  setPlatform(n) {
    if (typeof n != "undefined" && n !== null && n.length) {
      this.platformName = n.toLowerCase();
    } else if (this.userAgent.indexOf("Edge") > -1) {
      this.platformName = this.EDGE;
    } else if (this.userAgent.indexOf("Windows Phone") > -1) {
      this.platformName = this.WINDOWS_PHONE;
    } else if (this.userAgent.indexOf("Android") > 0) {
      this.platformName = this.ANDROID;
    } else if (/iPhone|iPad|iPod/.test(this.userAgent)) {
      this.platformName = this.IOS;
    } else {
      this.platformName =
        (this.navigator.platform &&
          this.navigator.platform.toLowerCase().split(" ")[0]) ||
        "";
    }
  }

  /**
   * @private
   */
  setVersion(v) {
    if (typeof v != "undefined" && v !== null) {
      v = v.split(".");
      v = parseFloat(v[0] + "." + (v.length > 1 ? v[1] : 0));
      if (!isNaN(v)) {
        this.platformVersion = v;
        return;
      }
    }

    this.platformVersion = 0;

    // fallback to user-agent checking
    let pName = this.name();
    let versionMatch = {
      android: /Android (\d+).(\d+)?/,
      ios: /OS (\d+)_(\d+)?/,
      windowsphone: /Windows Phone (\d+).(\d+)?/
    };

    if (versionMatch[pName]) {
      v = this.ua().match(versionMatch[pName]);

      if (v && v.length > 2) {
        this.platformVersion = parseFloat(v[1] + "." + v[2]);
      }
    }
  }

  /**
   * @private
   */
  nextUid() {
    return "f7" + this.nextId++;
  }

  /**
   * @private
   */
  detect() {
    const device = {};

    device.isWebView = () => {
      return !(
        !window.cordova &&
        !window.PhoneGap &&
        !window.phonegap &&
        window.forge !== "object"
      );
    };

    device.ios = () => {
      return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = () => {
      return !device.windows() && this.find("iphone");
    };

    device.ipod = () => {
      return this.find("ipod");
    };

    device.ipad = () => {
      return this.find("ipad");
    };

    device.android = () => {
      return !device.windows() && this.find("android");
    };

    device.windows = () => {
      return this.find("windows");
    };

    device.mobile = () => {
      return (
        device.androidPhone() ||
        device.iphone() ||
        device.ipod() ||
        device.windowsPhone()
      );
    };

    device.tablet = () => {
      return device.ipad() || device.androidTablet() || device.windowsTablet();
    };

    device.desktop = () => {
      return !device.tablet() && !device.mobile();
    };

    device.androidPhone = () => {
      return device.android() && this.find("mobile");
    };

    device.androidTablet = () => {
      return device.android() && !this.find("mobile");
    };

    device.windowsPhone = () => {
      return device.windows() && this.find("phone");
    };

    device.windowsTablet = () => {
      return device.windows() && (this.find("touch") && !device.windowsPhone());
    };

    return device;
  }

  /**
   * @private
   */
  onWindowLoad() {
    if (this.is("webview")) {
      // the window and scripts are fully loaded, and a cordova/phonegap
      // object exists then let's listen for the deviceready
      document.addEventListener(
        "deviceready",
        () => this.onPlatformReady(),
        false
      );
    } else {
      // the window and scripts are fully loaded, but the window object doesn't have the
      // cordova/phonegap object, so its just a browser, not a webview wrapped w/ cordova
      this.onPlatformReady();
    }

    if (this.windowLoadListenderAttached) {
      window.removeEventListener("load", () => this.onWindowLoad(), false);
    }
  }

  /**
   * @private
   */
  onPlatformReady() {
    // the device is all set to go, init our own stuff then fire off our event
    this.isReady = true;

    for (var x = 0; x < this.readyCallbacks.length; x++) {
      // fire off all the callbacks that were added before the platform was ready
      this.readyCallbacks[x]();
    }

    this.readyCallbacks = [];

    document.body.classList.add("platform-ready");
  }

  /**
   * @private
   */
  find(needle) {
    let userAgent = this.ua().toLowerCase();
    return userAgent.indexOf(needle) !== -1;
  }
}

export default new Platform();
