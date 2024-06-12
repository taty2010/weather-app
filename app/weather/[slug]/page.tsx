import getWeather from "../../components/getWeather";
import getGeo from '../../components/getGeo'
import Card from "@/app/components/card";

export default async function Page({ params }: { params: { slug: string } }) {
  const { lat, lon, name } = await getGeo(params.slug);

  try {
    await getWeather(lat, lon);

    return (
      <main className="">
        <section>
          <h1>5-day Forecast</h1>
          <h2>{name}</h2>
          <Card dynamic={true} getWeather={getWeather} getGeo={getGeo} zip={params.slug}/>
        </section>
      </main>
    );
  } catch (err) {
    return (
      <main>
        <h1>Page Not Found: Please enter correct zipcode</h1>
      </main>
    );
  }
}
