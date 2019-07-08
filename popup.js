// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const fivePaisaUrl = chrome.runtime.getURL('websites/5paisainject.js');
const amazonUrl = chrome.runtime.getURL('websites/amazoninject.js');
const appleUrl = chrome.runtime.getURL('websites/appleinject.js');
const microsoftUrl = chrome.runtime.getURL('websites/microsoftinject.js');
var urlsMapper = {
  fivepaisa: fetch(fivePaisaUrl).then(response => response.text()),
  amazon: fetch(amazonUrl).then(response => response.text()),
  apple: fetch(appleUrl).then(response => response.text()),
  microsoft: fetch(microsoftUrl).then(response => response.text())
};
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  let tab = tabs[0];
  chrome.windows.get(tab.windowId, function(win) {
    console.log(win);
  });
  var url = tab.url;
  if (
    url.indexOf('www.5paisa.com') != -1 ||
    url.indexOf('www.amazon.in') != -1
  ) {
    urlsMapper.fivepaisa.then(text => {
      console.log(text);
      chrome.tabs.executeScript(tabs[0].id, {
        code: text,
        matchAboutBlank: true
      });
    });
  }
});
