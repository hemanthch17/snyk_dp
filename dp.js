var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var XML = require('xml');

session.input.readAsBuffer(function(error, buffer) {
    if (error) {
        console.error("Read error: " + JSON.stringify(error));
        return;
    }
	
	var xmlStr = buffer.toString('utf-8');
    try {
        var fileListXml = XML.parse(xmlStr);
    } catch (e) {
       console.error("XML parse error: " + e.message);
        return;
    }
	
var inputFileName = uri.substring(uri.lastIndexOf('/') + 1);
 inputFileName =inputFileName.split('?')[0];
// inputFileName =inputFileName.split('.')[0]+ new Date().getTime()+  inputFileName.substring(inputFileName.lastIndexOf('.')) ;

var baseName = inputFileName.substring(0, inputFileName.lastIndexOf('.'));
console.error('baseName:'+baseName);
console.error('index:'+inputFileName.lastIndexOf('.'));
var extension = inputFileName.substring(inputFileName.lastIndexOf('.')) ;

var existingNames = [];
    var fileNodes = fileListXml.getElementsByTagNameNS("http://www.ibm.com/xmlns/prod/dp/filelist", "file");

    for (var i = 0; i < fileNodes.length; i++) {
        var fileNode = fileNodes.item(i);
        var fileName = fileNode.textContent.trim();
        
        if (fileName.startsWith(baseName)) {
            existingNames.push(fileName);
        }
    }

    var newFileName = inputFileName;
    var counter = 1;

    while (existingNames.includes(newFileName)) {
        newFileName = baseName + counter + extension;
        counter++;
    }
var url = 'sftp://192.168.16.101:22/home/sftp/upload/OUT/' + newFileName;
var ctx = session.name('destination') || session.createContext('destination');
console.log('destination url: ' + url);
ctx.setVar('url', url);

var ctx1 = session.name('request') || session.createContext('request');

session.output.write(ctx1.getVar('body'));
});
 
 
