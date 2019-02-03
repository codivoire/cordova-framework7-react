/* service functions */

const device = {};
const userAgent = window.navigator.userAgent.toLowerCase();

device.ios = function () {
  return device.iphone() || device.ipod() || device.ipad();
};

device.iphone = function () {
  return !device.windows() && find('iphone');
};

device.ipod = function () {
  return find('ipod');
};

device.ipad = function () {
  return find('ipad');
};

device.android = function () {
  return !device.windows() && find('android');
};

device.windows = function () {
  return find('windows');
};

device.mobile = function () {
  return (
    device.androidPhone() ||
    device.iphone() ||
    device.ipod() ||
    device.windowsPhone()
  );
};

device.tablet = function () {
  return (
    device.ipad() ||
    device.androidTablet() ||
    device.windowsTablet()
  );
};

device.desktop = function () {
  return !device.tablet() && !device.mobile();
};

device.androidPhone = function () {
  return device.android() && find('mobile');
};

device.androidTablet = function () {
  return device.android() && !find('mobile');
};

device.windowsPhone = function () {
  return device.windows() && find('phone');
};

device.windowsTablet = function () {
  return device.windows() && (find('touch') && !device.windowsPhone());
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
      return (typeof window.cordova != "undefined");
    }

    if (needle == "desktop") {
      return !device.tablet() && !device.mobile()
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
    document.addEventListener(this.is("cordova") ? "deviceready" : "DOMContentLoaded", fn, false);
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
    if (screen.orientation && Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
      return screen.orientation.type.includes('landscape');
    }

    return window.innerHeight / window.innerWidth < 1;
  }

  /**
   * Returns true if the app is in portait mode.
   *
   * @returns {boolean}
   */
  isPortrait() {
    if (screen.orientation && Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
      return screen.orientation.type.includes('portrait');
    }

    return window.innerHeight / window.innerWidth > 1;
  }

  /**
   * The back button event is triggered when the user presses the native platform’s back button,
   * also referred to as the “hardware” back button. This event is only used within Cordova apps
   * running on Android and Windows platforms. This event is not fired on iOS since iOS
   * doesn’t come with a hardware back button in the same sense an Android or Windows device does.
   *
   * @param {function} fn
   */
  registerBackButtonAction(fn) {
    document.addEventListener("backbutton", fn, false);
  }

  /**
   * Close an app on Android or Windows
   *
   * @requires cordova-plugin-exitapp
   */
  exitApp() {
    navigator.app.exitApp();
  }
}

export default (new Platform());
