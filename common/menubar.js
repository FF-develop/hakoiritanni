document.write('<ul class="menu"><li><a href="./index.html">TOP</a></li><li><a href="./rule.html">遊び方</a></li><li><a href="./copyright.html">製作者情報</a></li></ul>');


window.document.onkeydown = function(event){ 
    if(event.keyCode == 226)
      {
          event.keyCode = null;
          event.returnValue = false;
      }
  };
/*
window.document.addEventListener('contextmenu', contextmenu);

function contextmenu(e) {
  e.preventDefault();
}
*/
