const PAGE_MOD = require('sdk/page-mod');
const SELF = require("sdk/self");
const BUTTONS = require('sdk/ui/button/action');
const TAB = require('sdk/tabs');
const workers = require("sdk/content/worker");

var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: SELF.data.url("panel.html"),
  contentStyleFile: SELF.data.url("bootstrap.css"),
  onHide: handleHide,
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button,
      height: 325
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

PAGE_MOD.PageMod({
  include: '*.4chan.org',
  contentScriptFile: [SELF.data.url('jquery.js'), 
                      SELF.data.url('4chan-thread-style.js')]
});

PAGE_MOD.PageMod({
  include: '*.reddit.com',
  contentScriptFile: [SELF.data.url('jquery.js'), 
                      SELF.data.url('reddit-thread-style.js')]
});