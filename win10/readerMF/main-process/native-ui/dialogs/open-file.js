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
const walkSync = function(dir, filelist,ext) {
  function extension2(element) {
    var extName = path.extname(element);
    return extName === '' + ext;
  };
  console.log('dir : '+dir+'filelist :'+filelist);
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];

            // pour connaitre l'extension à choisir, on va regarder les checkboxes
            files.filter(extension2).forEach(function(file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    filelist = walkSync(path.join(dir, file), filelist,ext);
                    console.log('file : '+file+ ' dir : '+dir);
                }
                else {
                  console.log('file : '+file);
                    filelist.push(path.join(dir, file));
                }
            });
            return filelist;
        };
//https://gist.github.com/kethinov/6658166

const walkSync3 = (dir, filelist) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync3(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
return filelist;
}

const read = (dir,ext) =>
  fs.readdirSync(dir)
    .reduce((files, file) =>
      fs.statSync(path.join(dir, file)).isDirectory() ?
        files.concat(read(path.join(dir, file))) :
        files.concat(path.join(dir, file)),
      []);


      const walkSync4 = function(dir, filelist,ext) {
        function extension3(element) {
          var extName = path.extname(element);
          return extName === '' + ext;
        };
             var path = path || require('path');
             var fs = fs || require('fs'),
                 files = fs.readdirSync(dir);
             filelist = filelist || [];


             files.forEach(function(file) {
                 if (fs.statSync(path.join(dir, file)).isDirectory()) {
                     filelist = walkSync4(path.join(dir, file), filelist,ext);
                 }
                 else {

                   if(path.extname(file) == ext){
                     filelist.push(path.join(dir, file));
                   }

                 }
             });
             return filelist;
         };


// retourner la liste des Fichiers
const walkSync2 = function(dir, filelist) {
  console.log('dir : '+dir+'filelist :'+filelist);
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            // pour connaitre l'extension à choisir, on va regarder les checkboxes
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


ipcMain.on('open-file-dialog-2', (event,ext) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if (files) {
      console.log('files : '+files+ 'type : '+ typeof String(files)  );
      var liste=[];
      //walkSync(String(files),liste,String(ext));
      walkSync4(String(files),liste,ext);
      //liste=listFiles(String(files),String(ext));
      for( i in liste){
        console.log('-> '+path.basename(liste[i]))
      }
      event.sender.send('selected-directory-2', files)
      event.sender.send('available-file', liste)
    }
  })
})



ipcMain.on('read-file', (event, filepath) => {

  var text = fs.readFileSync(filepath,'latin1')
  var ext = path.extname(filepath);

  switch (ext) {
    case '.txt':
    event.sender.send('chosen-file',text,filepath)
    event.sender.send('edited-file',text)
    event.sender.send('modification',text)
      break;

      case '.md':
        event.sender.send('chosen-file',text,filepath)
        event.sender.send('edited-file',text)
        event.sender.send('modification-md-file',text)
        break;
    default:
      console.log('Aucune action associée à ' + ext + '.');
  }


})
