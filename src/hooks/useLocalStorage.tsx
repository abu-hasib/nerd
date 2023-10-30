import React from "react";

type DataObj = {
  geoname_id: string;
  name: string;
  population: number;
  request: unknown;
  location: unknown;
  current: unknown;
};

export default function useLocalStorage() {
  const [state, setState] = React.useState(() =>
    window.localStorage.getItem("data")
  );
  const [data, setData] = React.useState<DataObj[]>(
    () => JSON.parse(state!) || []
  );

  console.log({ use: data });

  console.log({ state });

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?select=geoname_id%2C%20name%2C%20population&order_by=population%20DESC%2C%20name%20ASC&limit=3"
      );
      const { results } = await res.json();
      console.log({ results });
      const mappedData = await Promise.all(
        results.map(async (el: any, i: number) => {
          const res = await fetch(
            `http://api.weatherstack.com/current?access_key=eab9e72468966111cf6634cc7c3c38c4&query=${el.name}`
          );
          const json = await res.json();
          results[i] = { ...results[i], ...json };
          console.log({ json });
          return results[i];
        })
      );
      setData(mappedData);
      window.localStorage.setItem("data", JSON.stringify(mappedData));
    }
    console.log("hellp");
    if (!state) fetchData();
  }, [state]);

  return [data, setData];
}
