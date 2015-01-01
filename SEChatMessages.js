// ==UserScript==
// @name         SE Rainbow messages!
// @namespace    http://www.easwee.net/
// @version      0.1
// @description  SE chat message background hue changer. Script is meant to be run in Tampermonkey or similar browser addon.
// @author       easwee
// @match        http://tampermonkey.net/installed.php?version=3.9.202&ext=dhdg&updated=true
// @grant        none
// ==/UserScript==

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var chat = document.getElementById('chat');
var frequency = .3;
var red, green, blue, luma, color;

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      var messages = document.querySelectorAll('.messages');

      for(var i = 0; i < messages.length; i++) {
        red   = Math.sin(frequency * i + 0) * 127 + 128;
        green = Math.sin(frequency * i + 2) * 127 + 128;
        blue  = Math.sin(frequency * i + 4) * 127 + 128;

        luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

        var color = luminance < 120 ? 'white' : 'black';

        messages[i].style.backgroundColor = rgba2color(red, green, blue, 0.8);
        messages[i].style.color = color;
      }
    }
  });
});

function rgba2color(r,g,b,a) {
  return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',' + a + ')';
}

observer.observe(chat, {
  attributes: false,
  childList: true,
  characterData: false
});
