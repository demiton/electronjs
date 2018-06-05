//const electron = require('electron')
//const ipcMain = electron.ipcMain
//const dialog = electron.dialog || electron.remote.dialog
const {ipcMain, dialog} = require('electron')
const fs = require('fs');
const path = require('path');




ipcMain.on('action-preview', (event, content) => {
  console.log('Action Preview');
  var text = content;
  //console.log(text);
      event.sender.send('edited-file', text)
})

ipcMain.on('action-reload', (event, content) => {
  console.log('Action Reload');
  var text = content;
      event.sender.send('edited-file', text)
})
