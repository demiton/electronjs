var fs = require('fs');
var path = require('path');
var holder = document.getElementById('drag-file');
var result = document.getElementById('dragged-fileName');

holder.ondragover = () => {
  return false;
};

holder.ondragleave = () => {
  return false;
};

holder.ondragend = () => {
  return false;
};

holder.ondrop = (e) => {
  e.preventDefault();
  var type = '';

  var list = result.getElementsByTagName("li");
  var itemCounter = 0;
  for (let f of e.dataTransfer.files) {
    fs.stat( f.path, function(err, stats) {
      var itemId = list.length + itemCounter + 1;
      console.log('itemId: ' + itemId);
      //itemCounter++;
      console.log('File(s) you dragged here: ', f.path)
      console.log( f.path);
      console.log();
      console.log(stats);
      console.log();

      if (stats.isFile()) {
        console.log('    file');
        type ='file';
      }
      if (stats.isDirectory()) {
        console.log('    directory');
        type = 'folder';
      }

      var node = document.createElement("LI");
      node.setAttribute('id','select-file-'+ itemId);
      node.setAttribute('data-pathFile',f.path);
      console.log("itemType : "+type);
      node.setAttribute('data-itemType',type);
      var textnode = document.createTextNode(path.basename(f.path));
      //  var textnode = document.createTextNode(f.path);
      node.appendChild(textnode);
      result.appendChild(node);
    });

  }


  return false;
};
