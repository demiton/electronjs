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
