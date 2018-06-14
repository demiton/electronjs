var $ = require('jquery');

const {ipcRenderer} = require('electron')
const path = require('path');

ipcRenderer.on('available-file', (event, list) => {
  document.getElementById('available-file').textContent = '';

  console.log('list size: '+list.length);
  if(list.length>0){
    for(var i in list){
      var node = document.createElement("button");
      node.className=' roundedCorner nav-button col-4';
      node.setAttribute('id','select-file-'+i);
      node.setAttribute('data-pathFile',list[i]);
      var textnode = document.createTextNode(path.basename(list[i]));
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

ipcRenderer.on('chosen-file', (event, content,path) => {
  document.getElementById('chosen-file').textContent = content
  var att = document.createAttribute("data-pathFile");        // Create a "href" attribute
  att.value = path;
  document.getElementById('chosen-file').setAttributeNode(att);

});


ipcRenderer.on('edited-file', (event, content) => {
  document.getElementById('edited-file').textContent = content

});

ipcRenderer.on('edited-md-file', (event, content) => {
  // yaml formulaire

  //md text content
  document.getElementById('edited-file').textContent = content

});


ipcRenderer.on('modification', (event, content) => {
  var x = document.createElement("TEXTAREA");
  x.className='txt-box m-3';
  x.id = 'txt-box';

  var t = document.createTextNode(content);
  x.appendChild(t);
  document.getElementById('text-modification').innerHTML = '';
  document.getElementById('text-modification').appendChild(x);

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
