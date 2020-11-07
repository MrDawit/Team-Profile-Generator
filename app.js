const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//call render func with completed employee array to generate final html as a string
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");



// function putIn(employeeClass, input){
// employeeClass.input = res.name
// };


console.log("it barely works");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function teamPrompt() {
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

        const Intern_member = new Intern(data.name, data.id, data.email);
        console.log("Intern: " + JSON.stringify(Intern_member));

        inquirer.prompt([
          {
            type: "input",
            name: "school",
            message: "Which school(currently or previously) are you from?"
          }
        ]).then(function (data) {

          Intern_member.school = data.school;
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
          console.log("Manager plus: " + JSON.stringify(Manager_member));
        });
        break;
      default:
    }

    // switch (data.employeeType) {
    //   case "intern":
    //     inquirer.prompt([
    //       {
    //         type: "input",
    //         name: "school",
    //         message: "Which school(currently or previously) are you from?"
    //       }
    //     ]).then(function (req, res) {
    //       Intern_member.school = res.school;
    //       console.log("Intern again: " + JSON.stringify(Intern_member));
    //     });
    //     break;
    //   case "engineer":
    //     inquirer.prompt([
    //       {
    //         type: "input",
    //         name: "github",
    //         message: "What is your github username?"
    //       }
    //     ]).then(function (req, res) {
    //       Engineer_member.GitHubUser = res.github;
    //     }
    //     );
    //     break;
    //   case "manager":
    //     inquirer.prompt([
    //       {
    //         type: "input",
    //         name: "office_number",
    //         message: "What is your office number?"
    //       }
    //     ]).then(function (req, res) {
    //       Manager_member.officeNumber = res.office_number;
    //     }
    //     );
    //     break;
    //   default:
    // }
  });

  // console.log("it semi-worked?");

  // After the user has input all employees desired, call the `render` function (required
  // above) and pass in an array containing all employee objects; the `render` function will
  // generate and return a block of HTML including templated divs for each employee!

  // After you have your html, you're now ready to create an HTML file using the HTML
  // returned from the `render` function. Now write it to a file named `team.html` in the
  // `output` folder. You can use the variable `outputPath` above target this location.
  // Hint: you may need to check if the `output` folder exists and create it if it
  // does not.

  // HINT: each employee type (manager, engineer, or intern) has slightly different
  // information; write your code to ask different questions via inquirer depending on
  // employee type.

  // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
  // and Intern classes should all extend from a class named Employee; see the directions
  // for further information. Be sure to test out each class and verify it generates an
  // object with the correct structure and methods. This structure will be crucial in order
  // for the provided `render` function to work! ```


};
teamPrompt();
 // console.log("work please");