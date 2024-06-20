import FiveDay from "./next5Days";

export default async function Card({ getWeather, getGeo, zip, dynamic }) {
  const { lat, lon, name } = await getGeo(zip);
  const data = await getWeather(lat, lon);
  const week = Object.keys(data);
  const currDay = data[week[0]];

  const getBG = `https://openweathermap.org/img/wn/${currDay[0].icon}@2x.png`;
  // remove the 6th day as long as there's still data within the current/next day
  if (currDay.length > 0 && week.length > 5) {
    week.pop();
  }

  return (
    <div
      className="card"
      style={
        dynamic
          ? { backgroundImage: `url(${getBG})` }
          : { backgroundImage: `none` }
      }
    >
      {!dynamic && <h2>{name}</h2>}
      <div className="card_inner">
        {week.map((day) => {
          return (
            data[day]?.length > 0 && (
              <div key={day} className="day">
                <h2>{day}</h2>
                <div className="weather">
                  <FiveDay data={data[day].splice(0,6)} day={day} />
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
