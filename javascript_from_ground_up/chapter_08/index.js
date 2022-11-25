const express = require("express")
const morgan = require("morgan")


async function startServer() {
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(helmet());
    app.use(express.static('public'))


    app.use(
        cors({
          origin: (origin, callback) => {
            if (!origin || SERVER_ALLOWED_ORIGIN.includes(origin)) {
              callback(null, true);
              return;
            }
            const error = new Error(
              `Origin ${origin} has been blocked by CORS policy`
            );
            logger.error(error);
            callback(error, origin);
          },
          credentials: true,
        })
      );

      


      app.listen(SERVER_PORT, logWelcome);
}


startServer();
