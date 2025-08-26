session.input.readAsBuffer(function(error, buffer) {
    if (error) {
        console.error("Read error: " + JSON.stringify(error));
        return;
    }
		var Str = buffer.toString('utf-8');
	var ctx = session.name('request') || session.createContext('request');
	ctx.setVar('body', Str);
	
	});