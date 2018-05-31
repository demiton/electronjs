const {ipcRenderer} = require('electron')

ipcRenderer.on('available-file', (event, list) => {
  document.getElementById('available-file').textContent = `Fichiers disponibles : `
  console.log('list size: '+list.length);
  if(list.length>0){
    for(var i in list){
      var node = document.createElement("button");
      node.className='item roundedCorner nav-button';
      node.setAttribute('id','select-file-'+i);
      var textnode = document.createTextNode(list[i]);
        node.appendChild(textnode);
        document.getElementById("available-file").appendChild(node);
    }

  }
    else{
      var node = document.createElement("LI");
      var textnode = document.createTextNode('Aucun Fichiers');
        node.appendChild(textnode);
        document.getElementById('available-file').appendChild(node);
    }
});

ipcRenderer.on('chosen-file', (event, content) => {
  document.getElementById('chosen-file').textContent = content

});
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
