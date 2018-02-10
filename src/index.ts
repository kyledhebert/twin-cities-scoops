#! /usr/bin/env node

import chalk from "chalk";
import * as clear from "clear";
import * as figlet from "figlet";
import * as _ from "lodash";
import * as clui from "clui";

import * as inquirer from "./lib/inquirer";
import * as scraper from "./lib/scraper";
import index from "chalk";

const Spinner = clui.Spinner;

clear();
console.log(
  chalk.magenta(figlet.textSync("Scoops", { horizontalLayout: "full" }))
);

async function run() {
  const answer = await inquirer.getLocation();
  const { location } = answer;
  const spinner = new Spinner(
    `Getting flavors from ${location}, please wait ...`
  );
  let flavors;
  spinner.start();
  if (_.startsWith(location, "Izzy's")) {
    flavors = await scraper.scrapeIzzys(location);
  } else {
    flavors = await scraper.scrapeMilkJam();
  }
  spinner.stop();
  flavors.forEach((flavor, index) => {
    index % 2 === 0
      ? console.log(chalk.white(flavor))
      : console.log(chalk.gray(flavor));
  });
}

run();
