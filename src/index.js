const dotenv = require("dotenv");
const { app } = require("./app");
const { connectDatabase } = require("./database");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 8080;

const initializeApplication = () => {
  connectDatabase().then(() => {
    app.listen(port, (error) => {
      console.log(`✅ Express app listening at http://localhost:${port}`);
    })
  }).catch((error) => {
    console.error("❌ Failed to start application", error);
    process.exit(1);

  })
};

initializeApplication();
