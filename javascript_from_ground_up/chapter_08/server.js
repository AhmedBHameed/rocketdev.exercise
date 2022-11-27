const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const HomeController = require('./controllers/home');
const LoginController = require('./controllers/login');
const LogoutController = require('./controllers/logout');
const ENVIRONMENT = require('./config/ENVIRONMENT');
const {default: helmet} = require('helmet');
const authMiddleware = require('./middlewares/auth');

async function startServer() {
  const app = express();

  app.use(morgan('tiny'));

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || ENVIRONMENT.SERVER_ALLOWED_ORIGIN.includes(origin)) {
          callback(null, true);
          return;
        }
        const error = new Error(
          `Origin ${origin} has been blocked by CORS policy`
        );
        callback(error, origin);
      },
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(cookieParser());
  app.disable('x-powered-by');

  app.use(express.static('public'));

  app.post('/api/login', LoginController);
  app.get('/api/logout', LogoutController);

  app.get('/', authMiddleware(), HomeController);

  app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Server listening at http://localhost:${ENVIRONMENT.PORT}`);
  });
}

startServer();
