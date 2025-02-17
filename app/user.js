/******
*    name: arkenfox user.js
*    date: 13 January 2025
* version: 133
*    urls: https://github.com/arkenfox/user.js [repo]
*        : https://arkenfox.github.io/gui/ [interactive]
* license: MIT: https://github.com/arkenfox/user.js/blob/master/LICENSE.txt

* README:

  1. Consider using Tor Browser if it meets your needs or fits your threat model
       * https://2019.www.torproject.org/about/torusers.html
  2. Read the entire wiki
       * https://github.com/arkenfox/user.js/wiki
  3. If you skipped step 2, return to step 2
  4. Make changes in a user-overrides.js
       * There are often trade-offs and conflicts between security vs privacy vs anti-tracking
         and these need to be balanced against functionality & convenience & breakage
       * Some site breakage and unintended consequences will happen. Everyone's experience will differ
         e.g. some user data is erased on exit (section 2800), change this to suit your needs
       * While not 100% definitive, search for "[SETUP" tags
  5. Some tag info
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Firefox itself behaves (i.e. not directly website related)
  6. Override Recipes: https://github.com/arkenfox/user.js/issues/1080

* RELEASES: https://github.com/arkenfox/user.js/releases

  * Use the arkenfox release that matches your Firefox version
    - DON'T wait for arkenfox to update Firefox, nothing major changes these days
  * Each release
    - run prefsCleaner to reset prefs made inactive, including deprecated (9999)
  * ESR
    - It is recommended to not use the updater, or you will get a later version which may cause issues.
      So you should manually append your overrides (and keep a copy), and manually update when you
      change ESR releases (arkenfox is already past that release)
    - If you decide to keep updating, then the onus is on you - also see section 9999

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION
  0300: QUIETER FOX
  0400: SAFE BROWSING
  0600: BLOCK IMPLICIT OUTBOUND
  0700: DNS / DoH / PROXY / SOCKS
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: DISK AVOIDANCE
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
  1600: REFERERS
  1700: CONTAINERS
  2000: PLUGINS / MEDIA / WEBRTC
  2400: DOM (DOCUMENT OBJECT MODEL)
  2600: MISCELLANEOUS
  2700: ETP (ENHANCED TRACKING PROTECTION)
  2800: SHUTDOWN & SANITIZING
  4000: FPP (fingerprintingProtection)
  4500: OPTIONAL RFP (resistFingerprinting)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: FINGERPRINTING
  9000: NON-PROJECT RELATED
  9999: DEPRECATED / RENAMED

******/

/* START: internal custom pref to test for syntax errors
 * [NOTE] Not all syntax errors cause parsing to abort i.e. reaching the last debug pref
 * no longer necessarily means that all prefs have been applied. Check the console right
 * after startup for any warnings/error messages related to non-applied prefs
 * [1] https://blog.mozilla.org/nnethercote/2018/03/09/a-new-preferences-parser-for-firefox/ ***/
 user_pref("_user.js.parrot", "START: Oh yes, the Norwegian Blue... what's wrong with it?");

 /* 0000: disable about:config warning ***/
 user_pref("browser.aboutConfig.showWarning", false);
 
 /*** [SECTION 0100]: STARTUP ***/
 user_pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");

 /*** [DOH]  ***/
user_pref("network.trr.mode", 3);
 
 /* 0102: set startup page [SETUP-CHROME]
  * 0=blank, 1=home, 2=last visited page, 3=resume previous session
  * [NOTE] Session Restore is cleared with history (2811), and not used in Private Browsing mode
  * [SETTING] General>Startup>Restore previous session ***/
 user_pref("browser.startup.page", 0);
