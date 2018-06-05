var $ = require('jquery');
var selectedId ='';
const {ipcRenderer} = require('electron')



const selectDirBtn = document.getElementById('select-directory')

const selectDirBtn2 = document.getElementById('select-directory-2')



/*selectDirBtn.addEventListener('click', (event) => {
ipcRenderer.send('open-file-dialog')
})
*/
selectDirBtn2.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog-2')
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
      var content = selectFileBtn.innerHTML;
      ipcRenderer.send('read-file',content);
    })
  }
  else if(String(selectedId).indexOf('action')!=-1){

    switch (selectedId) {
      case 'action-preview':
      const selectPreviewButton = document.getElementById(selectedId);
      console.log('action-preview');
      console.log(document.getElementById('modification').innerHTML);
      selectPreviewButton.addEventListener('click', (event) => {
        console.log('yes');
        var content = document.getElementById('modification').textContent;

        ipcRenderer.send('action-preview',content);
      })
      break;
      case 'action-reload':
      console.log('action-reload');
      const selectReloadButton = document.getElementById(selectedId);
      selectReloadButton.addEventListener('click', (event) => {
        var content = document.getElementById('chosen-file').innerHTML;
        ipcRenderer.send('action-reload',content);
      })
      break;
      case 'action-save':
      console.log('action-save');
      const selectSaveButton = document.getElementById('action-save');
      selectSaveButton.addEventListener('click', (event) => {
        var content =  document.getElementById('modification').innerHTML;
        ipcRenderer.send('action-save',content);
      })
      break;
      default:
      console.log('Aucune action associée à ' + expr + '.');


    }

  }


});
//$(".item").mouseleave(handler);
