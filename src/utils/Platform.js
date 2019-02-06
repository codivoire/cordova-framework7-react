/* service functions */

const device = {};
const userAgent = window.navigator.userAgent.toLowerCase();

device.ios = function() {
  return device.iphone() || device.ipod() || device.ipad();
};

device.iphone = function() {
  return !device.windows() && find("iphone");
};

device.ipod = function() {
  return find("ipod");
};

device.ipad = function() {
  return find("ipad");
};

device.android = function() {
  return !device.windows() && find("android");
};

device.windows = function() {
  return find("windows");
};

device.mobile = function() {
  return (
    device.androidPhone() ||
    device.iphone() ||
    device.ipod() ||
    device.windowsPhone()
  );
};

device.tablet = function() {
  return device.ipad() || device.androidTablet() || device.windowsTablet();
};

device.desktop = function() {
  return !device.tablet() && !device.mobile();
};

device.androidPhone = function() {
  return device.android() && find("mobile");
};

device.androidTablet = function() {
  return device.android() && !find("mobile");
};

device.windowsPhone = function() {
  return device.windows() && find("phone");
};

device.windowsTablet = function() {
  return device.windows() && (find("touch") && !device.windowsPhone());
};

function find(needle) {
  return userAgent.indexOf(needle) !== -1;
}

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

    this.backButtonActions = {};
    this.nextId = 0;
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
    if (needle == "cordova") {
      return typeof window.cordova != "undefined";
    }

    if (needle == "desktop") {
      return !device.tablet() && !device.mobile();
    }

    if (needle == "tablet") {
      return device.tablet();
    }

    if (needle == "mobile") {
      return device.mobile();
    }

    if (needle == "ios") {
      return device.ios();
    }

    if (needle == "iphone") {
      return device.iphone();
    }

    if (needle == "ipod") {
      return device.ipod();
    }

    if (needle == "ipad") {
      return device.ipad();
    }

    if (needle == "android") {
      return device.android();
    }

    if (needle == "windows") {
      return device.windows();
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
    document.addEventListener(
      this.is("cordova") ? "deviceready" : "DOMContentLoaded",
      fn,
      false
    );
  }

  device() {
    return window.device || {};
  }

  /**
   * The pause event fires when the native platform puts the application into the background,
   * typically when the user switches to a different application.
   *
   * @param {function} fn
   */
  onPause(fn) {
    document.addEventListener("pause", fn, false);
  }

  /**
   * The resume event emits when the native platform pulls the application out from the background.
   * This event would emit when a Cordova app comes out from the background, however,
   * it would not fire on a standard web browser.
   *
   * @param {function} fn
   */
  onResume(fn) {
    document.addEventListener("resume", fn, false);
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
   * @name Platform#onHardwareBackButton
   * @description
   * Some platforms have a hardware back button, so this is one way to bind to it.
   * @param {function} callback the callback to trigger when this event occurs
   */
  onHardwareBackButton(cb) {
    this.ready(function() {
      document.addEventListener("backbutton", cb, false);
    });
  }

  /**
   * @name Platform#offHardwareBackButton
   * @description
   * Remove an event listener for the backbutton.
   * @param {function} callback The listener function that was originally bound.
   */
  offHardwareBackButton(fn) {
    this.ready(function() {
      document.removeEventListener("backbutton", fn);
    });
  }

  /**
   * @name Platform#registerBackButtonAction
   * @description
   * The back button event is triggered when the user presses the native platform’s back button,
   * also referred to as the “hardware” back button. This event is only used within Cordova apps
   * running on Android and Windows platforms. This event is not fired on iOS since iOS
   * doesn’t come with a hardware back button in the same sense an Android or Windows device does.
   *
   * @param {function} callback Called when the back button is pressed, if this listener is the highest priority.
   * @param {number} priority Only the highest priority will execute.
   * @param {*=} actionId The id to assign this action. Default: a random unique id.
   * @returns {function} A function that, when called, will deregister
   * this backButtonAction.
   */
  registerBackButtonAction(fn, priority, actionId) {
    if (!this._hasBackButtonHandler) {
      // add a back button listener if one hasn't been setup yet
      this.backButtonActions = {};
      this.onHardwareBackButton(this.hardwareBackButtonClick);
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
   * Close an app on Android or Windows
   */
  exitApp() {
    this.ready(function() {
      navigator.app && navigator.app.exitApp && navigator.app.exitApp();
    });
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
  hardwareBackButtonClick(e) {
    // loop through all the registered back button actions
    // and only run the last one of the highest priority
    let priorityAction, actionId;

    for (actionId in this.$backButtonActions) {
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
  }
}

export default new Platform();
