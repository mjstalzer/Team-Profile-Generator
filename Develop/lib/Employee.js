// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        const z = this.name;
         return z;
    }
    getId(){
        const y = this.id;
        return y;
    }
    getEmail() {
        const j = this.email;
        return j;
    }
    getRole() {
        return Employee.name;
    }
}


module.exports = Employee