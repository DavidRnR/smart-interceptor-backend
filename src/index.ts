import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import routesAuth from './routes/auth.route';
import tokenChecker from './token-checker';
import routesPL from './routes/programming-lang.route';
import routesOS from './routes/os.route';

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('App running!'));

app.use(cors());
app.use(require('body-parser').json());
app.use('/api', routesAuth);
app.use('/api', routesOS);
app.use('/api', routesPL);

router.use(tokenChecker);

const dbUrl = `mongodb+srv://${config.env.MONGO_USER}:${config.env.MONGO_PASSWORD}@cluster0.02kb4kf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`;

mongoose.connect(dbUrl)
.then( () => {
    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
}).catch( err => {
    console.log(err)
});
