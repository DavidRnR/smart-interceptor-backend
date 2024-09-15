import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routesAuth from './routes/auth';
import routesPL from './routes/programmingLang';
import routesOS from './routes/os';
import { SERVER_CONFIG } from './config/config';

const app = express();

app.get('/', (_, res) => res.send('App running!'));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routesAuth);
app.use('/api', routesOS);
app.use('/api', routesPL);

app.listen(SERVER_CONFIG.PORT, () => console.log(`Server started on port ${SERVER_CONFIG.PORT}`));
