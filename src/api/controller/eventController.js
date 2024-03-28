const EventService = require("../../services/eventService");
const csv = require("csv-parser");
const fs = require("fs");

exports.createEvents = async (req, res) => {
  try {
    const events = [];
    fs.createReadStream("events.csv")
      .pipe(csv())
      .on("data", (data) => events.push(data))
      .on("end", async () => {
        const result = await EventService.createEvents(events);
        res
          .status(result.error ? 409 : 200)
          .json(
            result.error
              ? { error: result.error.message }
              : { message: "Events created successfully" }
          );
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findEvents = async (req, res) => {
  try {
    const { latitude, longitude, date } = req.query;
    const result = await EventService.findEvents(latitude, longitude, date);
    if (result.error) {
      res.status(400).json({ error: result.error.message });
    } else {
      res.status(200).json({...result});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};