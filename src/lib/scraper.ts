import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import * as _ from "lodash";

const izzysSelector = ".flavor-data";
const milkJamSelector = ".flavor-item-inner-right";

export async function scrapeIzzys(location: string): Promise<string[]> {
  const izzysLocation = whichIzzys(location);
  const response = await axios.get(
    `http://flavorup.izzysicecream.com/flavor-grid/web/${izzysLocation}`
  );
  const flavors = await parseFlavors(response, izzysSelector);
  return flavors;
}

export async function scrapeMilkJam(): Promise<string[]> {
  const response = await axios.get("https://milkjamcreamery.com/flavors/");
  const flavors = await parseFlavors(response, milkJamSelector);
  return flavors;
}

function parseFlavors(response: AxiosResponse, selector: string): string[] {
  const html = response.data;
  const $ = cheerio.load(html);
  let flavors: string[] = [];
  flavors = $(selector)
    .map((i, el) => {
      return $(el)
        .text()
        .trim()
        .replace(/\s\s+/, " -- ");
    })
    .get();
  return flavors;
}

function whichIzzys(location: string): string {
  if (_.startsWith("Izzy's - Saint")) {
    return "saintpaul";
  }
  return "minneapolis";
}
