
export default async function getGeo(zip) {
  const url = `${process.env.WEATHER_URL}geo/1.0/zip?zip=`;
  const zipcode = zip || 76017;
  const res = await fetch(`${url}${zipcode}&${process.env.WEATHER_API}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const coordinates = await res.json();

  return coordinates;
}