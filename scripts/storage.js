"use strict";

// hàm lưu vào storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// hàm lấy storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// hàm remove
function removeStorage(key) {
  localStorage.removeItem(key, JSON.stringify(value));
}

/*********** phần register ***********/

// tạo class User và constructor
class User {
  constructor(firstname, lastname, username, password, category, pageSize) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.category = category;
    this.pageSize = pageSize;
  }
}

// lấy dữ liệu useArr từ localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

const userArr = users.map(function (userData) {
  return parseUser(userData);
});

let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    userData.category,
    userData.pageSize
  );
  return user;
}

const currentUser = getFromStorage("currentUser");

/*********** phần todo list ***********/

// tạo class Task todo list
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
// todo
let todos = getFromStorage("todoTask") ? getFromStorage("todoTask") : [];
const todoArr = todos.map(function (user) {
  return parseTodoTask(user);
});
saveToStorage("todoTask", todoArr);

function parseTodoTask(taskData) {
  const user = new Task(taskData.task, taskData.owner, taskData.isDone);
  return user;
}
