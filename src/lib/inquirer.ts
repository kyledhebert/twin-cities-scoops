import * as inquirer from "inquirer";

export function getLocation(): Promise<inquirer.Answers> {
  const prompts = [
    {
      type: "list",
      name: "location",
      message: "Which store would you like to see flavors from?",
      choices: [
        "Izzy's - Saint Paul",
        "Izzy's - Minneapolis",
        "MilkJam Creamery"
      ]
    }
  ];

  return inquirer.prompt(prompts);
}
