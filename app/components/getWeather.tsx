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

const formatData = (data) => {
  const forecast = data.list.map(({ main: { temp }, weather, dt_txt, dt }: Forecast) => {
    const day = new Date(dt_txt).toUTCString().split(",")[0].trim();
    return {
      time: new Date(Number(dt) * 1000).toUTCString().split(" ")[4].trim(),
      dt,
      temp: Math.round(Number(temp)),
      icon: weather[0].icon,
      desc: weather[0].description,
      date: new Date(dt_txt),
      day,
    };
  });
  const group = forecast.reduce((result, val) => {
      // group by day of the week
    const day = (result[val.day] ||= []);
    day.push(val)
    return result
  }, {})
  return group
};

export default async function getWeather(lat: Number, lon: Number) {
  const path = `${process.env.WEATHER_URL}/data/2.5/forecast?`;
  const url = `${path}lat=${lat}&lon=${lon}&units=imperial&${process.env.WEATHER_API}`;
  const res = await fetch(url, {
    cache: 'no-store'
  });

  const data = await res.json();
  return formatData(data);;
}
