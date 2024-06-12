import { geolocation } from '@vercel/edge';

interface Forecast {
  main: Main;
  weather: Weather[]
  dt_txt: string;
  dt: Number;
} 

type Main = {
  temp: Number;
  humidity: Number;
  temp_max: Number;
  temp_min: Number;
}

type Weather = {
  id: Number;
  main: String;
  description: String;
  icon: String;
}

const getFiveDay = () => {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const num = week.indexOf(new Date().toUTCString().split(',')[0].trim())
  const days = week.toSpliced(num)

  return week.slice(num).concat(days).slice(0, 5)
}

export async function GET(req: Request){
  const url = `${process.env.WEATHER_URL}/data/2.5/forecast?`
  const { latitude, longitude } = geolocation(req)
  const lat = latitude ?? 44.34
  const lon = longitude ?? 10.99
  const res = await fetch(`${url}lat=${lat}&lon=${lon}&units=imperial&${process.env.WEATHER_API}`, {
    headers:{
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  const fiveDayForecast = getFiveDay()
  
  const forecast = {}
  fiveDayForecast.forEach((day) => {
    forecast[day] = []
  })

  data.list.forEach(({main: {temp, humidity, temp_min, temp_max}, weather, dt_txt, dt}: Forecast) => {
    const day = new Date(dt_txt).toUTCString().split(',')[0].trim()
    const test = {
      time: new Date(Number(dt) * 1000).toUTCString().split(' ')[4].trim(),
      dt,
      temp,
      low: temp_min,
      high: temp_max,
      humidity,
      weather,
      date: new Date(dt_txt),
      day: new Date(dt_txt).toUTCString().split(',')[0].trim()
    }

    forecast[day]?.push(test)
  })
  return Response.json(forecast)
}