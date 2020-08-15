const express = require('express');
const app = express();
const path = require('path');

app.use('/flight_test',express.static(__dirname + '/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build', 'index.html')); 
});
app.listen(9000);