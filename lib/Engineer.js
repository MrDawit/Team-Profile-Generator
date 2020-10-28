const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee2 = require("./Employee");

class Engineer extends Employee2{
    constructor(name, id, email, GitHubUser) {
        super(name, id, email)
        this.github = GitHubUser;
    };
    getRole(){
        return "Engineer";
    };
    getGithub(){
        return this.github;
    };
};


module.exports = Engineer;