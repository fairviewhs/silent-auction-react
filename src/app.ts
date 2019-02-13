import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import jwtStrategy from './modules/auth/passport';
import error from './modules/error/error';
import auth from './modules/routes/auth';
import bids from './modules/routes/bid';
import auctions from './modules/routes/auctions';
import sponsors from './modules/routes/sponsor';

// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/silent-auction', { useNewUrlParser: true });

// Passport setup (authentication)
passport.use(jwtStrategy());

// Express Config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// API Routes
const apiRoute = express.Router();

apiRoute.use('/auth', auth);
apiRoute.use('/auction', auctions);
apiRoute.use('/bid', bids);
apiRoute.use('/sponsor', sponsors)
// apiRoute.use('/donation', donations);
// apiRoute.use('/item', items);
// apiRoute.use('/user', users);

app.use('/api', apiRoute);

// Route every route to React (expect for api routes)
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// API Error handling
app.use(error);

// Start the express server
app.listen(config.get('port'), () => {
  console.log(`Started server on port ${config.get('port')}`);
});