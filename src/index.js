const { app } = require('./app');
const { connectDatabase } = require('./database');
const { APP_PORT } = require('./utils/secrets');

const initializeApplication = () => {
  connectDatabase()
    .then(() => {
      app.listen(APP_PORT, (error) => {
        if (error) {
          console.error('❌ Failed to start application. Error: ', error);
        }

        console.log(
          `✅ Express app listening at http://localhost:${APP_PORT} `
        );
      });
    })
    .catch((error) => {
      console.error('❌ Failed to start application. Error: ', error);
      process.exit(1);
    });
};

initializeApplication();
