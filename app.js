
const express = require('express')
const config = require('config')
const sequelize = require('./config/database.js')

const routes = require('./router/index')
const app = express()
const PORT = config.get("port") || 5000
app.use(express.json())
app.use(routes)

const run = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection established");
        await sequelize.sync();
        app.listen(PORT, () => {
      console.log(`server running on port  http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log("connction failed", error);
  }
};
run();
