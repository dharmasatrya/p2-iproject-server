const routes = require("./routes/index");
const express = require("express");
const cors = require("cors");
const schedule = require("node-schedule");
const ScheduleController = require("./controllers/scheduleController");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

schedule.scheduleJob({ hour: 0 }, ScheduleController.ageItem);

app.listen(port, () => {
  console.log(`now running on ${port}`);
});

module.exports = app;
