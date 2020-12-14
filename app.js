const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const pathTeam = "./output/team.html"
let team = [];


//creates new or erases then creates new team.html file
const createHTML = function createHtml(member) {
  team.push(member);
  fs.writeFileSync(outputPath, render(team), function (err) {
    if (err) {
      throw err;
    }
  });
};
//appends team.html file if already existing (note: also creates new, but does not erase, so this functionality is useless right now)
const addHTML = function addToHtml(member) {
  team.push(member);
  fs.appendFileSync(outputPath, render(team), function (err) {
    if (err) {
      throw err;
    }
  });
};
//function deletes team.html when "starting a new team" is selected since internal code appends team.html using a new container under old container
function deleteHtml() {
  fs.unlinkSync(pathTeam, function (err) {
    if (err) {
      throw err;
    }
  });
};
//function uses node prompt to ask whether to start, change team.html file or exit app
function statusPrompt() {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your choice ",
      name: "status",
      choices: [
        "Starting your team",
        "Add member to your team",
        "Return"
      ]
    }
  ]).then(function (data) {
    switch (data.status) {
      case "Starting your team":
        teamPrompt(createHTML);
        break;
      case "Add member to your team":
        teamPrompt(addHTML);
        break;
      case "Return":
        break;
      default:
    };
  });
};
//function uses node prompt to ask whether user wants to continue to add team members in the same container of the team.html file
function continuePrompt() {
  inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to continue adding team members?",
      name: "continue"
    }
  ]).then(function (data) {
    if (data.continue === true) {
      deleteHtml();
      statusPrompt();
    } else {
        ender();
    };
  });
};
//function uses node prompt to ask team member description questions, then uses that information to either create or append team.html file
function teamPrompt(stats) {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select their role on the team",
      name: "employeeType",
      choices: [
        "intern",
        "engineer",
        "manager"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What is their name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is their id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their email?"
    }

  ]).then(function (data) {
    switch (data.employeeType) {
      case "intern":
        let Intern_member = new Intern(data.name, data.id, data.email);

        inquirer.prompt([
          {
            type: "input",
            name: "school",
            message: "Which school(currently or previously) are they from?"
          }
        ]).then(function (data) {
          Intern_member.school = data.school;
          //callback for each type of member (outer callback decides whether to write or append team.html file)
          stats(Intern_member);
          continuePrompt();
        });
        break;
      case "engineer":
        let Engineer_member = new Engineer(data.name, data.id, data.email);

        inquirer.prompt([
          {
            type: "input",
            name: "github",
            message: "What is their github username?"
          }
        ]).then(function (data) {
          Engineer_member.github = data.github;
          stats(Engineer_member);
          continuePrompt();
        });

        break;
      case "manager":
        let Manager_member = new Manager(data.name, data.id, data.email);
        inquirer.prompt([
          {
            type: "input",
            name: "office_number",
            message: "What is their office number?"
          }
        ]).then(function (data) {
          Manager_member.officeNumber = data.office_number;
          stats(Manager_member);
          continuePrompt();
        });
        break;
      default:
    };
  });
};

function intro() {
  console.log("Welcome to the Team-Profile-Generator!");
};
function ender() {
  console.log("\n\n Your new or updated 'team.html' file should be in your OUTPUT directory!")
}
//calling our functions
intro();
statusPrompt();
