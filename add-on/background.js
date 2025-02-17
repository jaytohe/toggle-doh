
/*
Log response of the app to the console.
*/
const onResponse = (response) => {
  console.log("Received: " + response);
  console.log(typeof response)
};


const updateIcon = (status) => {
  console.log("Updated icon to " + status);
  if (status) {
    browser.browserAction.setIcon({
      path : {48: "icons/message_on.svg"}
    })
  }
  else {
    browser.browserAction.setIcon({
      path : {48: "icons/message_off.svg"}
    })
  }
}
const onStatusResponse = (status) => {
  updateIcon(status)
};

const onToggleResponse = () => {
  console.log("Restart required after DoH toggle.");
  
}

/*
Log error of the app on exit.
*/

const onError = (error) => {
    console.log(`Error: ${error}`);
};

/*
When the extension's action icon is clicked, send the app a message.
*/
browser.browserAction.onClicked.addListener(() => {
  let sending = browser.runtime.sendNativeMessage("ping_pong", "toggle");
  sending.then(onToggleResponse, onError);
});

browser.runtime.onStartup.addListener(() => {
  // Get DNS over HTTPS status
  let sending = browser.runtime.sendNativeMessage("ping_pong", "status");
  sending.then(onStatusResponse, onError);
});

browser.runtime.onInstalled.addListener(() => {
  // Get DNS over HTTPS status
  let sending = browser.runtime.sendNativeMessage("ping_pong", "status");
  sending.then(onStatusResponse, onError);
});