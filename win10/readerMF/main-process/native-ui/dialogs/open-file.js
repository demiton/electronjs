//const electron = require('electron')
//const ipcMain = electron.ipcMain
//const dialog = electron.dialog || electron.remote.dialog
const {ipcMain, dialog} = require('electron')
const fs = require('fs');
const path = require('path');



/// filtrer les Fichiers
const extFilter ='txt';
function extension(element) {
  var extName = path.extname(element);
  return extName === '.' + extFilter;
};

// retourner la liste des Fichiers
const walkSync = function(dir, filelist) {
  console.log('dir : '+dir+'filelist :'+filelist);
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.filter(extension).forEach(function(file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    filelist = walkSync(path.join(dir, file), filelist);
                }
                else {
                    filelist.push(path.join(dir, file));
                }
            });
            return filelist;
        };
//https://gist.github.com/kethinov/6658166

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if (files) {
      event.sender.send('selected-directory', files)
    }
  })
})


ipcMain.on('open-file-dialog-2', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if (files) {
      console.log('files : '+files+ 'type : '+ typeof String(files)  );
      var liste=[];
      walkSync(String(files),liste);
      for( i in liste){
        console.log('-> '+liste[i])
      }
      event.sender.send('selected-directory-2', files)
    }
  })
})
