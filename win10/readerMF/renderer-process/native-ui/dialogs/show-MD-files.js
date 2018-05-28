const {ipcRenderer} = require('electron')

ipcRenderer.on('available-file', (event, path) => {
  document.getElementById('available-file').innerHTML = `Fichiers Dispo`
})


//var glob = require('glob');
//console.log('test');
// some options
/*
options = {
    cwd: 'node_modules'
},
*/
// for Files
//forFiles = function(err,files){ console.log(files);};

// glob it.
//glob('**/*.md', options, forFiles);




//  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
//  files.forEach((file) => { require(file) })
