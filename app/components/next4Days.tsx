export default function FourDay({ data, day }) {
  return (
    <div className="weather_details">
      {data[day]
        .sort((a, b) => b.dt - a.dt)
        .splice(0, 5)
        ?.map((weather) => (
          <div key={`${day}${weather.date}`} className="weather_details_hour">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
              alt={weather?.details}
              className="weather_icon"
            />
            <p>{weather?.time?.replace(":00", "")} UTC</p>
            <p>{weather?.temp}<span>&#8457;</span></p>
          </div>
        ))}
    </div>
  );
}
