const EventService = require('../../services/eventService');
const csv = require('csv-parser');
const fs = require('fs');

exports.createEvents = async (req, res) => {
  try {
    const events = [];
    fs.createReadStream('events.csv')
      .pipe(csv())
      .on('data', (data) => events.push(data))
      .on('end', async () => {
        await EventService.createEvents(events);
        res.status(200).json({ message: 'Events created successfully' });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findEvents = async (req, res) => {
  try {
    const { latitude, longitude, date } = req.query;
    const events = await EventService.findEvents(latitude, longitude, date);

    res.status(200).json({
      events,
      page: 1,
      pageSize: 10,
      totalEvents: events.length,
      totalPages: 1,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};