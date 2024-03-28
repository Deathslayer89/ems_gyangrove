const axios = require("axios");
const Event = require("../models/Event");
const { getWeather, getDistance } = require("../api/utils/externalAPI");

class EventService {
  static async createEvents(events) {
    return await Event.createEvents(events);
  }

  static async findEvents(latitude, longitude, date, pageSize = 10) {
    const events = await Event.findEvents(latitude, longitude, date);

    const getWeatherAndDistance = async (event) => {
      const [weatherResponse, distanceResponse] = await Promise.all([
       getWeather(event.city_name,event.event_date),
        getDistance(latitude,longitude,event.latitude,event.longitude),
      ]);
      
      return {
        event_name: event.event_name,
        city_name: event.city_name,
        date: event.event_date,
        time: event.event_time,
        weather: weatherResponse.data,
        distance_km: parseFloat(distanceResponse.distance),
      };
    };
    const processedEvents = await Promise.all(
      events.map(getWeatherAndDistance)
    );


    const totalEvents = processedEvents.length;
    const totalPages = Math.ceil(totalEvents / pageSize);

    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedEvents = processedEvents.slice(startIndex, endIndex);

      pages.push({
        events: paginatedEvents,
        page: i + 1,
        pageSize: paginatedEvents.length,
        totalEvents,
        totalPages,
      });
    }

    return pages;
  }

 
}

module.exports = EventService;
