export type NoteType = {
    id: number,
    text: string
}
export type ResponseData = {
    geoname_id: string;
    name: string;
    population: number;
    request: object;
    location: {name: string, localtime: string, };
    current: {weather_icons: string, temperature: string};
  };