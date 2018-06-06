//const electron = require('electron')
//const ipcMain = electron.ipcMain
//const dialog = electron.dialog || electron.remote.dialog
const {ipcMain, dialog} = require('electron')
const fs = require('fs');
const path = require('path');




ipcMain.on('action-preview', (event, content) => {
  console.log('Action Preview');
  var text = content;
  console.log('Content : '+content);
  //console.log(text);
      event.sender.send('edited-file', text)
})

ipcMain.on('action-reload', (event, content) => {
  console.log('Action Reload');
  var text = content;
      event.sender.send('edited-file', text)
      event.sender.send('modification', text)
})

ipcMain.on('action-save', (event, content,path) => {
  console.log('Action Save');
  var text = content;
  console.log('path : '+path);
  console.log('content : '+content);
  fs.writeFile(path, text , 'latin1', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

})
