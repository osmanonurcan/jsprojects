class CW5 extends Menu {
    constructor(){
        super()
        this.student = new Student("1621221004","Osman","2.0","JS")
        this.course = new Course("JS","13.00-15.00","Thursday","C-131")
        this.point = new Point(1,2)
        this.point3d = new Point3D(1,2,3) 

    }
}

class Course {
    constructor(name, time, date, room) {
        this.name = name
        this.time = time
        this.date = date
        this.room = room
    }

    toString() {
        return this.name + '\n' + this.time + '\n' +this.date + '\n' + this.room 
    }

}

class Student {
    
    constructor(id, name, gpa, schedule) {
        this.id = id
        this.name = name
        this.gpa = gpa
        this.schedule = schedule
    }
    
    toString() {
        return this.id+ '\n' + this.name + '\n' +this.gpa + '\n' + this.schedule 
    }

}
class Point {
    
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    
    toString() {
        return this.x+ '\n' + this.y
    }

}
class Point3D {
    
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }
    
    toString() {
        return this.x+ '\n' + this.y + '\n' +this.z
    }

}
