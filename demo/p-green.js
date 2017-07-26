var p = document.getElementsByTagName("p")[0];
document.body.appendChild( document.createTextNode( window.getComputedStyle(p,false)["color"] ) );