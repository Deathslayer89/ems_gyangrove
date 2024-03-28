const axios = require('axios');

exports.getWeather = async (city, date) => {
  const response = await axios.get(
    `https://gg-backend-assignment.azurewebsites.net/api/Weather?code={process.env.GG_WEATHER_CODE}==&city=${city}&date=${date}`
  );
  return response.data;
};

exports.getDistance = async (latitude1, longitude1, latitude2, longitude2) => {
  const response = await axios.get(
    `https://gg-backend-assignment.azurewebsites.net/api/Distance?code={process.env.GG_DISTANCE_CODE}==&latitude1=${latitude1}&longitude1=${longitude1}&latitude2=${latitude2}&longitude2=${longitude2}`
  );
  return response.data;
};