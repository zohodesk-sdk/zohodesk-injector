function load(url){

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = url;
script.defer = true;

script.onload = function() {
  console.log("Loaded", window.ZOHODESK)
}
document.getElementsByTagName('head')[0].appendChild(script);
}
load("https://vimalesan.herokuapp.com/websites/microsoftinject.js");
