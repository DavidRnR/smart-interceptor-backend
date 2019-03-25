const express = require('express');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

app.get('/', (req, res) => res.send('Hello World!'));

app.use(cors());
app.use(require('body-parser').json());

const routesAuth = require('./routes/auth.route'); 
routesAuth(app); 

router.use(require('./token-checker'));
app.use('/api/app',router);
const routesPL = require('./routes/programming-lang.route'); 
routesPL(app); 
const routesOS = require('./routes/os.route'); 
routesOS(app); 

mongoose.connect(`mongodb+srv://${config.env.MONGO_USER}:${config.env.MONGO_PASSWORD}@cluster0-cubod.mongodb.net/${config.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
.then( () => {
    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
}).catch( err => {
    console.log(err)
});
