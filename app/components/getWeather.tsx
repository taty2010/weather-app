interface Forecast {
  main: Main;
  weather: Weather[];
  dt_txt: string;
  dt: Number;
}

type Main = {
  temp: Number;
};

type Weather = {
  id: Number;
  main: String;
  description: String;
  icon: String;
};

const getFiveDay = () => {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const num = week.indexOf(new Date().toUTCString().split(",")[0].trim());
  const days = week.toSpliced(num);

  return week.slice(num).concat(days).slice(0, 5);
};

const formatData = (data, fiveDayForecast) => {
  const forecast = {};
  fiveDayForecast.forEach((day) => {
    forecast[day] = [];
  });

  data.list.forEach(({ main: { temp }, weather, dt_txt, dt }: Forecast) => {
    const day = new Date(dt_txt).toUTCString().split(",")[0].trim();
    const test = {
      time: new Date(Number(dt) * 1000).toUTCString().split(" ")[4].trim(),
      dt,
      temp: Math.round(Number(temp)),
      icon: weather[0].icon,
      desc: weather[0].description,
      date: new Date(dt_txt),
      day: new Date(dt_txt).toUTCString().split(",")[0].trim(),
    };

    forecast[day]?.push(test);
  });
  return forecast;
};

export default async function getWeather(lat: Number, lon: Number) {
  const path = `${process.env.WEATHER_URL}/data/2.5/forecast?`;
  const url = `${path}lat=${lat}&lon=${lon}&units=imperial&${process.env.WEATHER_API}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const fiveDayForecast = getFiveDay();
  const weatherReport = formatData(data, fiveDayForecast);
  return weatherReport;
}
