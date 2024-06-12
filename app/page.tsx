import getWeather from "./components/getWeather";
import getGeo from "./components/getGeo";
import Card from "./components/card";

export default async function Home() {
  const popularZipcodes = [60601, 85001, 94102, 33131];

  return (
    <main className='index'>
      <section className='index_inner'>
        <h1>5-day Forecast</h1>
        <p> Check out other forecast's by adding /weather/[zipcode] to the url</p>
        <h2>Popular Zipcodes</h2>
        {popularZipcodes.map((zip) => {
          return(
            <Card key={zip} dynamic={false} getWeather={getWeather} getGeo={getGeo} zip={zip}/>
          )
        })}
      </section>
    </main>
  );
}
