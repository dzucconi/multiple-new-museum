import { DATA, type DataRecord } from "./data";

const MONTHS: readonly string[] = [
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
  let length = arr.length;

  while (--length > 0) {
    const j = Math.floor(Math.random() * (length + 1));
    const temp = arr[j];
    arr[j] = arr[length];
    arr[length] = temp;
  }

  return arr;
}

function toQueryString(
  options: Record<string, string | number | undefined>
): string {
  return Object.entries(options)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function randomColor(): string {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `%23${hex}`;
}

interface LinkOptions extends Record<string, string | number | undefined> {
  year: string;
  month: string;
  day: string;
  color: string;
  bgcolor: string;
  hour?: string;
  minute?: string;
}

function createLink(record: DataRecord): string {
  const options: LinkOptions = {
    year: record.ending[0],
    month: MONTHS[parseInt(record.ending[1], 10) - 1],
    day: record.ending[2],
    color: randomColor(),
    bgcolor: randomColor(),
  };

  if (record.time !== null) {
    options.hour = record.time.ending[0];
    options.minute = record.time.ending[1];
  }

  const queryString = toQueryString(options);
  const url = `http://xxith.com/?${queryString}`;
  return `<a href="${url}" target="_blank">${record.title}</a>`;
}

function initialize(): void {
  const shuffledData = shuffle([...DATA]);
  const links = shuffledData.map(createLink);

  const body = document.body;
  if (body) {
    body.innerHTML = links.join(", ");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
