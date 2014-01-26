var connect = require('connect');
connect.createServer(
    connect.static("www")
).listen(8080);