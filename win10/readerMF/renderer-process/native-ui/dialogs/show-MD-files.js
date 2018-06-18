var $ = require('jquery');

const {ipcRenderer} = require('electron')
const path = require('path');
var yamlFront = require('yaml-front-matter');


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
/*
ipcRenderer.on('modification-md-file', (event, content) => {
  // yaml formulaire
  document.getElementById('text-modification').textContent = '';
  var JsonForm= yamlFront.loadFront(content);
//  var objects = JSON.parse(JsonForm);
    var obj = yamlFront.loadFront(content);
    Object.keys(obj).forEach(function(key) {
      console.log(key, obj[key]);
      var node = document.createElement("button");
      node.className=' roundedCorner nav-button col-4';
      node.setAttribute('id','select-file-'+key);
      //node.setAttribute('data-pathFile',list[i]);
      console.log('ob'+obj[key]+ ' type : '+ (typeof obj[key]))
      var str = obj[key];
      var textnode = document.createTextNode(str);
      console.log('-- '+textnode)
      if(textnode!=null){
        node.appendChild(textnode);
        document.getElementById("text-modification").appendChild(node);
      }
    });
});
*/

ipcRenderer.on('modification-md-file', (event, content) => {
  // yaml formulaire
  document.getElementById('text-modification').textContent = '';

    var obj = yamlFront.loadFront(content);
    var myform = document.createElement("FORM");
    myform.name='myForm';
    myform.method='POST';

    Object.keys(obj).forEach(function(key) {
      console.log(key, obj[key]);
      var my_input;
      if(String(key) != '__content'){
        my_input = document.createElement('INPUT');
        my_input.className='m-1';
      }else{
        my_input = document.createElement('TEXTAREA');
        my_input.className='txt-box m-2';
      }

      var my_inputLabel=document.createElement('LABEL');
      my_input.type='TEXT';
      my_input.name=key;
      my_input.value=obj[key];
      my_input.setAttribute('id','select-file-'+key);
      ///
      my_inputLabel.type='TEXT';

      //my_inputLabel.name=key;
      my_inputLabel.innerText=key;
      my_inputLabel.setAttribute('for','select-label-'+key);
      my_inputLabel.appendChild(my_input);
      myform.appendChild(my_inputLabel);
    //  myform.appendChild(my_input);
    //  node.className=' roundedCorner nav-button col-4';

      //node.setAttribute('data-pathFile',list[i]);
        document.getElementById("text-modification").appendChild(myform);
    });
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
