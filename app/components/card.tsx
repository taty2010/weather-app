import FourDay from "./next4Days";

export default async function Card({ getWeather, getGeo, zip, dynamic }) {
  const { lat, lon, name } = await getGeo(zip);
  const data = await getWeather(lat, lon);
  const week = Object.keys(data);

  const getBG = `https://openweathermap.org/img/wn/${
    data[week[0]][0].icon
  }@2x.png`;

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
        {week?.map((day) => {
          return (
            data[day]?.length > 0 && (
              <div key={day} className="day">
                <h2>{day}</h2>
                <div className="weather">
                  <FourDay data={data} day={day} />
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
