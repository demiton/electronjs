const readline = require('readline');
const fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var csv = require('csv-parser')
//console.dir(argv);


//console.log(argv.f)
var nameFile = argv.f;
// on verifie si le fichier en argument exist
var count=0;
if(fs.existsSync(nameFile)){

  /*
  const rl = readline.createInterface({
  input: fs.createReadStream(nameFile, {encoding: 'binary'})
});
var count=0;
rl.on('line', function (line) {
if(count == 0){ // on va renvoyer un fichier csv pour un contrat unique
console.log('Line ', line);
}else{
console.log(count);
}
count++;



}).on('close', function() {
console.log('Have a great day!');
process.exit(0);
});;
*/
var stream = csv({
  raw: false,     // do not decode to utf-8 strings
  separator: ';', // specify optional cell separator
  quote: '"',     // specify optional quote character
  escape: '"',    // specify optional escape character (defaults to quote value)
  newline: '\n',  // specify a newline character
  strict: true    // require column length match headers length
})


var csvHeader = '';
var clientArray = [];
var clientObject = {};
var nSeq ='';
var csvLine ='';
var headers=[];
fs.createReadStream(nameFile, {encoding: 'binary'})
.pipe(stream)
.on('headers', function (headerList) {

  csvHeader = headerList[1]; // numero de sequence
  //                           console.log('First header: %s', csvHeader).
  headers = headerList;
})
.on('data', function (data) {
  var tmpSeq = data[csvHeader];
  if(count != 0 && nSeq ==''){nSeq = data[csvHeader]} ;
  if(count == 0){ // on va renvoyer un fichier csv pour un contrat unique
    clientArray[0]=csvHeader;
    for( i in headers){
      csvLine+=  headers[i] + ';'
    }
    //console.log(headers);
  }
  else if(nSeq!='' && tmpSeq == nSeq){
    //            console.log(data);
    clientObject+=data;
    //            console.log(typeof data);
    //            console.log(data[csvHeader]);
    /// on transforme l'object en ligne CSV

    for( i in headers){
      csvLine+=  data[headers[i]] + ';'
    }
    csvLine+='\n';
  }
  else{

  }
  count++;



}).on('end', function() {
  //console.log(clientObject);
  console.log(csvLine);
  process.exit(0);
});
}
else{
  console.log('Le fichier ' + nameFile + ' est introuvable')
}
