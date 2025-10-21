import { DATA, type DataRecord } from "./data";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const toQueryString = (params: Record<string, string | number | undefined>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

const randomColor = () =>
  `%23${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

function createLink(record: DataRecord): string {
  const params = {
    year: record.ending[0],
    month: MONTHS[parseInt(record.ending[1], 10) - 1],
    day: record.ending[2],
    color: randomColor(),
    bgcolor: randomColor(),
    ...(record.time && {
      hour: record.time.ending[0],
      minute: record.time.ending[1],
    }),
  };

  return `<a href="http://xxith.com/?${toQueryString(
    params
  )}" target="_blank">${record.title}</a>`;
}

const initialize = () =>
  (document.body.innerHTML = shuffle([...DATA])
    .map(createLink)
    .join(", "));

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initialize)
  : initialize();
