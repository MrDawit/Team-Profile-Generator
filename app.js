const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let team = [];
//console.log("it barely works");

//creates new or erases then creates new team.html file
const c_Html = function createHTML(member) {
  team.push(member);
  fs.writeFileSync(outputPath, render(team), function (err) {
    if (err) {
      throw err;
    }
  });
};
//appends team.html file if already existing (note: also creates new, but does not erase, so this functionality is useless right now)
const a_Html = function addToHTML(member) {
  team.push(member);
  fs.appendFileSync(outputPath, render(team), function (err) {
    if (err) {
      throw err;
    }
  });
};

function teamPrompt(status) {
  inquirer.prompt([
    {
      type: "rawlist",
      message: "Select your role on the team",
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
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    }

  ]).then(function (data) {

    console.log("Type: " + JSON.stringify(data));

    switch (data.employeeType) {
      case "intern":

        let Intern_member = new Intern(data.name, data.id, data.email);
        console.log("Intern: " + JSON.stringify(Intern_member));

        inquirer.prompt([
          {
            type: "input",
            name: "school",
            message: "Which school(currently or previously) are you from?"
          }
        ]).then(function (data) {
          console.log("got here with 1");
          Intern_member.school = data.school;
          status(Intern_member);
          console.log("Intern plus: " + JSON.stringify(Intern_member));
        });
        break;
      case "engineer":
        let Engineer_member = new Engineer(data.name, data.id, data.email);
        console.log("Engineer: " + JSON.stringify(Engineer_member));

        inquirer.prompt([
          {
            type: "input",
            name: "github",
            message: "What is your github username?"
          }
        ]).then(function (data) {
          Engineer_member.github = data.github;
          status(Engineer_member);
          console.log("Engineer plus: " + JSON.stringify(Engineer_member));
        });

        break;
      case "manager":
        let Manager_member = new Manager(data.name, data.id, data.email);
        console.log("Managager: " + JSON.stringify(Manager_member));
        inquirer.prompt([
          {
            type: "input",
            name: "office_number",
            message: "What is your office number?"
          }
        ]).then(function (data) {
          Manager_member.officeNumber = data.office_number;
          status(Manager_member);
          console.log("Manager plus: " + JSON.stringify(Manager_member));
        });
        break;
      default:
    }
    console.log("got here with 2");
  });
};

console.log("Welcome to the Team-Profile-Generator!")
function status_prompt() {
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
        teamPrompt(c_Html);
        break;
      case "Add member to your team":
        teamPrompt(a_Html);
        break;
      case "Return":
        break;
      default:
    };
  });

};

// function continue_prompt() {
//   inquirer.prompt([
//     {
//       type: "confirm",
//       message: "Do you want to continue adding team members?",
//       name: "continue"

//     }
//   ]).then(function (data) {
//     if (data.continue == true) {
//       status_prompt();
//     };
//   });
// };

status_prompt();
//  continue_prompt();

// console.log("Goodbye!");
 // console.log("work please");

