
const express = require('express')
const config = require('config')
const sequelize = require('./config/database.js')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./router/index')
const app = express()
const PORT = config.get("port") || 5000

// port 8080 dan 8088 ga almashtirildi 

app.use(fileUpload());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
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
