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



const s_p = function status_prompt() {
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
        t_p(c_Html);
      // return c_p();

      case "Add member to your team":
        t_p(a_Html);
      // return c_p();
      case "Return":
        break;
      default:
    };
  });

};




const c_p = function continue_prompt() {
  inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to continue adding team members?",
      name: "continue"

    }
  ]).then(function (data) {
    if (data.continue === true) {
      s_p();
    };
  });
};



const t_p = function teamPrompt(stats) {
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
    switch (data.employeeType) {
      case "intern":
        let Intern_member = new Intern(data.name, data.id, data.email);

        inquirer.prompt([
          {
            type: "input",
            name: "school",
            message: "Which school(currently or previously) are you from?"
          }
        ]).then(function (data) {
          Intern_member.school = data.school;
          stats(Intern_member);
          c_p();
        });
        break;
      case "engineer":
        let Engineer_member = new Engineer(data.name, data.id, data.email);

        inquirer.prompt([
          {
            type: "input",
            name: "github",
            message: "What is your github username?"
          }
        ]).then(function (data) {
          Engineer_member.github = data.github;
          stats(Engineer_member);
          c_p();
        });

        break;
      case "manager":
        let Manager_member = new Manager(data.name, data.id, data.email);
        inquirer.prompt([
          {
            type: "input",
            name: "office_number",
            message: "What is your office number?"
          }
        ]).then(function (data) {
          Manager_member.officeNumber = data.office_number;
          stats(Manager_member);
          c_p();
        });
        break;
      default:
    };
  });
};

const intro = function () {
  console.log("Welcome to the Team-Profile-Generator!");
};

// async function howToRunThis(){
//    let first = await s_p
//   let second = await t_p
//   let third = await c_p
//   first;
//   second;
//   third;
// };

//howToRunThis();

intro();
s_p();



// let p = new Promise((resolve)=>{
//   resolve(s_p);
//  // console.log("u are number 2");
// });
// p.then(function (value){
//     inquirer.prompt([
//       {
//         type: "confirm",
//         message: "Do you want to continue adding team members?",
//         name: "continue"

//       }
//     ]).then(function (data) {
//       if (data.continue === true) {
//         return status_prompt();
//       };
//     });
//   });

  //console.log("i am number 1");
// }).catch(()=>{
//   c_p;


//  continue_prompt();

// console.log("Goodbye!");
 // console.log("work please");
 // console.log("last version of team object: " + JSON.stringify(team));
