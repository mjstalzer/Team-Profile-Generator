// global constants required from other files needed for this CLI \\
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// an empty array that will be filled with new employee objects based on user inputs \\
let employees = [];
// this function starts the prompt by asking user info about the team manager \\
// this prompt ends by asking which employee they would like to add next \\
function init() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email address?",
            // ensures the user types in an email address \\ 
            validate: async(managerEmail) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(managerEmail)) {
                    return true
                }
                else {
                    return "Type in valid email..."
                }
            }
        },
        {
            type: "input",
            name: "managerOffNum",
            message: "What is your manager's office number?"
        },

    ]).then(answers => {
        // creates a new manager object based on user input \\
        const a = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffNum);
        // pushes new manager to employees array \\
        employees.push(a);
        // calls next function to render the appropriate prompt \\
        next();
    })
}
// calls the init function to initialize CLI \\
init();

// the next function asks which employee user wants to add next \\
const next = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members."
            ]
        },
    ]).then(answers => {
        // based on answers from user, these conditionals will render the correct next step \\
        if (answers.type === "Engineer") {
            engineerQ();
        }
        if (answers.type === "Intern") {
            internQ();
        }
        if (answers.type === "I don't want to add any more team members.") {
            fs.writeFileSync(outputPath, render(employees), "utf-8")
        }
    })
}

// this prompt asks the engineer specific questions \\
const engineerQ = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email address?",
            // ensures the user input is an email address \\
            validate: async(email) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    return true
                }
                else {
                    return "Type in valid email..."
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?"
        },
    ]).then(answers => {
        // creates a new engineer object given the users answers \\
        const b = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // pushes the new engineer to the employees array \\
        employees.push(b);
        // calls the next function
        next();
    })
}
// similar to the above function but applies to interns \\
const internQ = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email address?",
            validate: async(email) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    return true
                }
                else {
                    return "Type in valid email..."
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Where does your intern go to school?"
        },
    ]).then(answers => {
        const c = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(c);
        next();
    })
}
