import React from "react";
import { ResponseData } from "../types";
import { opsURL, wsURL } from "../lib/constants";

export default function useLocalStorage() {
  const [state, ,] = React.useState(() => window.localStorage.getItem("data"));
  const [data, setData] = React.useState<Array<ResponseData>>(
    () => JSON.parse(state!) || []
  );

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${opsURL}`);
      const { results } = await res.json();
      console.log({ results });

      try {
        const mappedData = await Promise.all(
          results.map(async (el: ResponseData, i: number) => {
            const res = await fetch(
              `${wsURL}?q=${el.name}&appid=${import.meta.env.VITE_AK}`
            );
            const json = await res.json();
            results[i] = { ...results[i], ...json };
            console.log({ json });
            return results[i];
          })
        );
        setData(mappedData);
        window.localStorage.setItem("data", JSON.stringify(mappedData));
      } catch (error) {
        throw new Error(error);
      }
    }
    if (!state) fetchData();
  }, [state]);

  return [data, setData];
}
