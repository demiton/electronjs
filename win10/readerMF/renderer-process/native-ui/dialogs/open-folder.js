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

});
//$(".item").mouseleave(handler);
