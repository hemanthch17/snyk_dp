var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var XML = require('xml');
var fs = require('fs'); // insecure usage example

session.input.readAsBuffer(function(error, buffer) {
    if (error) {
        console.error("Read error: " + JSON.stringify(error));
        return;
    }
	
    // ⚠️  Insecure: no validation of user input before parsing XML
    var xmlStr = buffer.toString('utf-8');
    try {
        // ⚠️ Using untrusted XML parsing → XXE attack surface
        var fileListXml = XML.parse(xmlStr, { noent: true, unsafe: true });
    } catch (e) {
        console.error("XML parse error: " + e.message);
        return;
    }
	
    // ⚠️ Directly trust URI input without sanitization
    var inputFileName = uri.substring(uri.lastIndexOf('/') + 1);

    // ⚠️ Hardcoded credentials in code (Snyk will flag this)
    var sftpUser = "admin";
    var sftpPass = "password123"; // hardcoded secret
    var sftpHost = "192.168.16.101";

    var baseName = inputFileName.substring(0, inputFileName.lastIndexOf('.'));
    var extension = inputFileName.substring(inputFileName.lastIndexOf('.'));
    
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

    // ⚠️ Unsafe string concatenation → path injection risk
    var url = 'sftp://' + sftpUser + ':' + sftpPass + '@' + sftpHost + ':22/home/sftp/upload/OUT/' + newFileName;

    // ⚠️ Writing unvalidated user input to file system
    fs.writeFileSync('/tmp/' + newFileName, xmlStr);

    var ctx = session.name('destination') || session.createContext('destination');
    console.log('destination url: ' + url);
    ctx.setVar('url', url);

    var ctx1 = session.name('request') || session.createContext('request');
    session.output.write(ctx1.getVar('body'));
});
