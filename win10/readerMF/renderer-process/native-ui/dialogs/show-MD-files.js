var $ = require('jquery');

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


ipcRenderer.on('edited-file', (event, content) => {
  document.getElementById('edited-file').textContent = content

});

ipcRenderer.on('modification', (event, content) => {
  var x = document.createElement("TEXTAREA");
  x.className='txt-box m-3';

  var t = document.createTextNode(content);
  x.appendChild(t);
  document.getElementById('modification').innerHTML = '';
  document.getElementById('modification').appendChild(x);

  // on ajoute aussi les boutons de modification
  var node = document.createElement("button");
  node.className='demo-button m-3';
  node.setAttribute('id','action-preview');
  //node.setAttribute('id','select-file-'+i);
  var textnode = document.createTextNode('Prévisualiser');
  node.appendChild(textnode);
  document.getElementById('button-modification').innerHTML='';
  document.getElementById('button-modification').appendChild(node);
  //
  var nodeV = document.createElement("button");
  nodeV.className='demo-button m-3';
  nodeV.setAttribute('id','action-reload');
  //node.setAttribute('id','select-file-'+i);
  var textnodeV = document.createTextNode('Recharger');
  nodeV.appendChild(textnodeV);
  document.getElementById('button-modification').appendChild(nodeV);
  //
  var nodeS = document.createElement("button");
  nodeS.className='demo-button m-3';
  nodeS.setAttribute('id','action-save');
  var textnodeS = document.createTextNode('Sauvegarder');
  nodeS.appendChild(textnodeS);
  document.getElementById('button-modification').appendChild(nodeS);
//

  });
