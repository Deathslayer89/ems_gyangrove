const axios = require('axios');
const Event = require('../models/Event');

class EventService {
  static async createEvents(events) {
    await Event.createEvents(events);
  }

  static async findEvents(latitude, longitude, date) {
    const events = await Event.findEvents(latitude, longitude, date);

    const getWeatherAndDistance = async (event) => {
      
       
      return {
        event_name: event.event_name,
        city_name: event.city_name,
        date: event.event_date,
        time: event.event_time,
        weather: weatherResponse.data,
        distance_km: parseFloat(distanceResponse.data.distance),
      };
    };

    const processedEvents = await Promise.all(
      events.map((event) => getWeatherAndDistance(event))
    );

    return processedEvents;
  }
}

module.exports = EventService;