var $ = require('jquery');

const {ipcRenderer} = require('electron')

// reference vers les checbox
var el = document.getElementById('checkbox-type');
//console.log(el)

var boxList = el.getElementsByTagName('input'); // onrécupère la liste des inputs

// on affecte à chaque box une fonction JS
for (var i=0, len=boxList.length; i<len; i++) {
    if ( boxList[i].type === 'checkbox' ) {
        boxList[i].onclick = selectType
    }
}




// called onclick of toppings checkboxes
function selectType(e) {
  //console.log($(e.target).attr('id'));
  var cbxId = $(e.target).attr('id');
  // on déslectionne toutes les autres checkbox
  for (var i=0, len=boxList.length; i<len; i++) {
      if ( boxList[i].id != cbxId ) {
          boxList[i].checked = false;
      }
  }
}
