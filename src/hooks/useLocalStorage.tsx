import React from "react";
import { ResponseData } from "../types";
import { opsURL, wsURL } from "../lib/constants";

export default function useLocalStorage() {
  const [state, setState] = React.useState(() =>
    window.localStorage.getItem("data")
  );
  const [data, setData] = React.useState<ResponseData[]>(
    () => JSON.parse(state!) || []
  );

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${opsURL}`);
      const { results } = await res.json();
      console.log({ results });
      const mappedData = await Promise.all(
        results.map(async (el: any, i: number) => {
          const res = await fetch(
            `${wsURL}?access_key=${import.meta.env.VITE_AK}&query=${el.name}`
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
    if (!state) fetchData();
  }, [state]);

  return [data, setData];
}
