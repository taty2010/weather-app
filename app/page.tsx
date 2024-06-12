import FourDay from "./components/next4Days";

async function getWeather() {
  const res = await fetch(`${process.env.NEXT_URL}/forecast`);
  return res.json();
}

export default async function Home() {
  const data = await getWeather();
  const week = Object.keys(data);

  const getBG = `https://openweathermap.org/img/wn/${data[week[4]][0].icon}@2x.png`
  

  return (
    <main className="">
      <section>
        <h1>5-day Forecast</h1>
        <div className="card" style={{ backgroundImage: `url(${getBG})` }}>
          <div className="card_inner">
          {week?.map((day) => {
            return (
              data[day].length > 0 && (
                <div className="day">
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
      </section>
    </main>
  );
}
