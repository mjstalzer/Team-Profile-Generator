# Team-Profile-Generator
![alt-text-gif-app-demo](https://github.com/mjstalzer/Team-Profile-Generator/blob/master/Develop/Untitled_%20Aug%2019%2C%202020%2010_17%20PM.gif)
# About this app:
* This Node.js CLI application involved a variety of concepts including classes, constructors, tests, npm inquirer, and .then().
### Classes: 
* To start the code, I created the employee class that was the common ground for each type of employee. This class had to pass tests given by the instructions. I used the employee class to create three subclasses: manager, engineer, and intern. These new classes had unique characteristics which is why they needed to be broken off of the main employee class.
### Inquirer:
* The functionality of this app came by way of inquirer. I set a prompt of questions for each type of employee and a 'next' question. Using the .then method I would ask the appropriate follow up question set. This would continue potentially forever or until the user selected the option that ends the prompt. The user input was collected and used to create the appropriate object that would be displayed in the html and browser.
