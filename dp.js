var sm = require('service-metadata');
var uri = sm.getVar('var://service/URI');
var XML = require('xml');
var fs = require('fs');
var child_process = require('child_process');
var sqlite3 = require('sqlite3').verbose();

// === 1. Read input unsafely ===
session.input.readAsBuffer(function(error, buffer) {
    if (error) {
        console.error("Read error: " + JSON.stringify(error));
        return;
    }

    // ⚠️ No validation of request body
    var userInput = buffer.toString('utf-8');  

    // === 2. SQL Injection ===
    var db = new sqlite3.Database(':memory:');
    db.serialize(function() {
        // ⚠️ Directly concatenating untrusted input into SQL
        db.run("CREATE TABLE users (id INT, name TEXT)");
        db.run("INSERT INTO users VALUES (1, 'admin')");
        db.run("INSERT INTO users VALUES (2, 'guest')");
        db.each("SELECT * FROM users WHERE name = '" + userInput + "'", function(err, row) {
            console.log("User fetched: " + JSON.stringify(row));
        });
    });

    // === 3. XSS / HTML Injection ===
    var unsafeHtml = "<html><body>User says: " + userInput + "</body></html>";
    // ⚠️ No sanitization before output
    session.output.write(unsafeHtml);

    // === 4. Command Injection ===
    // ⚠️ Passing user input directly into shell
    child_process.exec("ls " + userInput, function(err, stdout, stderr) {
        if (err) console.error("Command failed: " + err);
        else console.log("Command output: " + stdout);
    });

    // === 5. Hardcoded secret ===
    var sftpUrl = "sftp://admin:SuperSecret123@192.168.16.101:22/home/upload/" + userInput;
    console.log("Connecting to: " + sftpUrl);

    // === 6. Dangerous file write ===
    // ⚠️ Writing user input directly to disk without validation
    fs.writeFileSync("/tmp/" + userInput, "Untrusted content: " + userInput);
});
