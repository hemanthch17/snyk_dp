/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var filename = uri.substring(uri.lastIndexOf('/') + 1);
filename = filename.split('?')[0]; // remove query parameters
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/



/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var filename = uri.substring(uri.lastIndexOf('/') + 1);
filename = filename.split('?')[0]; // remove query parameters
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/



/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI').split('?')[0]; // remove query parameters
var filename = uri.substring(uri.lastIndexOf('/') + 1);
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/




/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI').split('?')[0]; // remove query parameters
var filename = uri.substring(uri.lastIndexOf('/') + 1);
filename = filename.substring(0, filename.indexOf('.csv') + 4); 
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/



/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI').split('?')[0]; 
var filename = uri.substring(uri.lastIndexOf('/') + 1);
filename = filename.substring(0, filename.indexOf('.csv') + 4);
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/


/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var filename = uri.split('?Rename=')[1];
filename = filename.substring(0, filename.indexOf('.csv') + 4);
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/


/*var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');

// Check if the URI contains query parameters
var filename;
if (uri.includes('?')) {
    // Split the URI to get the filename part before the query parameters
    filename = uri.split('?')[0]; // Get the part before '?'
} else {
    filename = uri; // If no query parameters, use the full URI
}

// Extract the actual file name from the URI
filename = filename.substring(filename.lastIndexOf('/') + 1); // Get the file name from the path

// Construct the SFTP URL for the output path
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + filename;

// Create or retrieve the context for the destination
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);*/




var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');

// Check if the URI contains query parameters
var filename;
if (uri.includes('?')) {
    // Split the URI to get the filename part before the query parameters
    filename = uri.split('?')[0]; // Get the part before '?'
} else {
    filename = uri; // If no query parameters, use the full URI
}

// Extract the actual file name from the URI
var fileNameOnly = filename.substring(filename.lastIndexOf('/') + 1); // Get the file name from the path

// Construct the SFTP URL for the output path
var sftpUrl = "sftp://192.168.16.101:22/home/sftp/upload/OUT/" + fileNameOnly;

// Create or retrieve the context for the destination
var ctx = session.name('destination') || session.createContext('destination');
ctx.setVar('url', sftpUrl);

// Log the output URL for debugging
console.log("Output SFTP URL:", sftpUrl);



