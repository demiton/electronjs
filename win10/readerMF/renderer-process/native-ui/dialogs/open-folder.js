var $ = require('jquery');
var selectedId ='';
const {ipcRenderer} = require('electron')



const selectDirBtn = document.getElementById('select-directory')

const selectDirBtn2 = document.getElementById('select-directory-2')



/*selectDirBtn.addEventListener('click', (event) => {
ipcRenderer.send('open-file-dialog')
})
*/

/// Repetition avec controls.js a revoir
// reference vers les checbox
var el = document.getElementById('checkbox-type');
var boxList = el.getElementsByTagName('input'); // onrécupère la liste des inputs


function selectedExtension(e){
var extension ='';
for (var i=0, len=boxList.length; i<len; i++) {
    if ( boxList[i].checked) {
        extension = boxList[i].value;
    }
}
  return extension;
}


selectDirBtn2.addEventListener('click', (event) => {
 // on choisit l'extension à filtrer
 var extension = '.'+selectedExtension();
console.log(extension);
  ipcRenderer.send('open-file-dialog-2',extension)
})

ipcRenderer.on('selected-directory', (event, path) => {
  document.getElementById('selected-file').innerHTML = `Dossier sélectionné: ${path}`
})

ipcRenderer.on('selected-directory-2', (event, path) => {
  document.getElementById('selected-file-2').innerHTML = `You selected: ${path}`
})







$(document).on('mouseover', 'button', function(e) {
  console.log($(e.target).attr('id'));
  selectedId = $(e.target).attr('id');
  console.log(selectedId);
  if(String(selectedId).indexOf('select-file')!=-1){
    const selectFileBtn = document.getElementById(selectedId);
    selectFileBtn.addEventListener('click', (event) => {
      //var content = selectFileBtn.innerHTML;
      var content = selectFileBtn.dataset.pathfile;
      console.log('path : '+ selectFileBtn.dataset.pathfile)
      if(content != undefined){
          ipcRenderer.send('read-file',content);
      }else{
        console.log('path : '+content);
      }

    })
  }
  else if(String(selectedId).indexOf('action')!=-1){
    document.getElementById('modification').addEventListener('click', (event) => {
      console.log('event target: '+event.target.id);
      if(event.target.id != 'txt-box'){
        var expr = event.target.id;
        switch (expr) {
          case 'action-preview':
            const selectPreviewButton = document.getElementById(selectedId);
            console.log('action-preview');
            console.log(document.getElementById('text-modification').innerHTML);
            var content = $('#txt-box').val();
            console.log(content);
            ipcRenderer.send('action-preview',content);
            break;
          case 'action-reload':
          console.log('action-reload');
            var content = document.getElementById('chosen-file').innerHTML;
            ipcRenderer.send('action-reload',content);
          break;
          case 'action-save':
            console.log('action-save');
            var content = $('#txt-box').val();
            var path = document.getElementById('chosen-file').dataset.pathfile;
              console.log('path : '+path);
            ipcRenderer.send('action-save',content,path);
            break;
          default:
          console.log('Aucune action associée à ' + expr + '.');
        }
      }




    });


  }


});
//$(".item").mouseleave(handler);
