const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');

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

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-cubod.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
.then( () => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}).catch( err => {
    console.log(err)
});
