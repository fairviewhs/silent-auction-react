import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import { user as userAuth, admin as adminAuth} from './modules/auth/passport';
import error from './modules/error/error';
import auth from './modules/routes/user';
import bids from './modules/routes/bid';
import auctions from './modules/routes/auctions';
import sponsors from './modules/routes/sponsor';
import admin from './modules/routes/admin';
import setupAdmin from './setupAdmin';

// Mongoose Setup
mongoose.connect(config.get('mongodb'), { useNewUrlParser: true });
setupAdmin();

// Passport setup (authentication)
passport.use('user', userAuth());
passport.use('admin', adminAuth());

// Express Config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// API Routes
const apiRoute = express.Router();

apiRoute.use('/user', auth);
apiRoute.use('/auction', auctions);
apiRoute.use('/bid', bids);
apiRoute.use('/sponsor', sponsors)
apiRoute.use('/admin', admin);
// apiRoute.use('/donation', donations);
// apiRoute.use('/item', items);
// apiRoute.use('/user', users);

app.use('/api', apiRoute);

// API Error handling
app.use(error);

// Start the express server
app.listen(config.get('port'), () => {
  console.log(`Started server on port ${config.get('port')}`);
});