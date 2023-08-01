class Student {
    // constructor is used to instantiate new student instances
    // constructor is implicitly called
    constructor(firstName, lastName, year) {
        // "this" refers to the individual instance of student
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = year;
    }
}

// to create a new student object, we need "new"
let firstStudent = new Student("Colt", "Steele", 1);
let secondStudent = new Student("Blue", "Steele", 2);


