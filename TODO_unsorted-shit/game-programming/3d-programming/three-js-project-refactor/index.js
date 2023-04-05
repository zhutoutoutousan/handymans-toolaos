var express = require('express'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 8081));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Running on port ${app.get('port')}`);
    }
});