"use strict"
class Database {
    constructor(studentMap, courseMap) {
        this.studentMap = studentMap
        this.courseMap = courseMap

    }

}
class Course {
    constructor(name, time, date, room) {
        this.name = name
        this.time = time
        this.date = date
        this.room = room
    }
    toString(){
        return this.name + " " + this.time+ " " + this.date + " " + this.room;
    }
}
class Student {
    constructor(id, name, gpa, schedule) {
        this.id = id
        this.name = name
        this.gpa = gpa
        this.schedule = schedule
    }
    toString(){
        return this.id + " " + this.name + " " + this.gpa + " " + this.schedule;
    }
}


async function getCoursesData() {

    let bytes = await fetch("https://maeyler.github.io/JS/data/Courses.txt");
    let text = await bytes.text();
    let lines = text.split('\n');
    let courses=[];
    lines.forEach(line => {
        let blocks = line.split('\t')
        courses.push(new Course(blocks[0], blocks[1], blocks[2], blocks.slice(3)))

    });
    return courses;
}

async function getStudentsData() {

    let bytes = await fetch("https://maeyler.github.io/JS/data/Students.txt");
    let text = await bytes.text();
    let lines = text.split('\n');
    let students=[];
    lines.forEach(line => {
        let blocks = line.split('\t')
        students.push(new Student(blocks[0], blocks[1], blocks[2], blocks.slice(3)))

    });
    return students;
}



function findCoursesGivenStudent() {
    let id = document.getElementById('in').value
    let s = database.studentMap.get(id)
    result.innerText = s.toString();
}

function mapper(arr) {
    let map = new Map()
    arr.forEach(obj => {
        map.set(obj[Object.keys(obj)[0]], obj)

    });
    return map
}
function totalCourseNumberforGivenRoom(){
    let room = document.getElementById('in').value
    let c = courses.filter(course => course.room.includes(room))
    result.innerText = "Total Course Number: "+c.length
}
function courseListforGivenRoom(){
    let room = document.getElementById('in').value
    let c = courses.filter(course => course.room.includes(room))
    let r="Course List"+'\n';
    c.forEach(course =>{
        r+=course.toString()+'\n'
    })
    result.innerText = r
}
function studentListbyGivenCourse(){
    let name = document.getElementById('in').value
    let s = students.filter(student => student.schedule.includes(name))
    let r="Student List"+'\n';
    s.forEach(student =>{
        r+=student.toString()+'\n'
    })
    result.innerText = r
}
function coursesTakenbyaGivenStudent(){
    let id = document.getElementById('in').value
    let s = database.studentMap.get(id)
    result.innerText = s.schedule.toString()
}
function numberOfStudentsGivenGpa(gpa){
    let s = students.filter(student => student.gpa > gpa)
    result.innerText = s.length
}

function getRandomStudent() {
    let s = students[Math.trunc(Math.random() * (students.length))]
    result.innerText = s.toString();
}

function scheduleByGivenStudent(){
    
    let id = document.getElementById('in').value
    let s = database.studentMap.get(id)
    result.innerText = s.name + "'s Schedule:" +'\n' 
    for(let c of s.schedule) {
        result.innerText += database.courseMap.get(c).toString() + '\n'
    }

}

function totalNumberofStudentsInRoom(){
    let total = new Set()
    let room = document.getElementById('in').value
    let c = courses.filter(course => course.room.includes(room))
    let s = []
    for (let course of c) {
        s = students.filter(student => student.schedule.includes(course.name))
        for (let e of s) {
            total.add(e.id)
        }
    }
    
    result.innerText = "Total Number of Students in the Room: "+total.size
}

var database;
var students;
var courses;

async function getDatabase() {
    courses = await getCoursesData()
    students = await getStudentsData()
    database = new Database(mapper(students), mapper(courses))
}

getDatabase();
