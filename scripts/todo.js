"use strict";

// kích hoạt khi đã đăng nhập
if (userActive) {
  // khai báo biến ban đầu
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputtask = document.getElementById("input-task");
  displayTodoList();
  // hiển thị các thông tin danh sách todo (todo list )
  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner == userActive.username)
      //lọc ra tên user name người tạo ra task , username sẽ lấy theo user hiện đang login vào hệ thống
      .forEach((todo) => {
        //duyệt mảng todoarr rồi in ra
        html += `
    <li  class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>`;
      });
    todoList.innerHTML = html;
    eventToggleTasks(); // đánh dấu vào task đã hoàn thành hay chưa
    DeleteTask(); // xoá task
  }
  //  bắt sự kiện khi click
  btnAdd.addEventListener("click", function () {
    // check input rỗng
    if (!inputtask.value) {
      alert("please input your title");
    }
    // khi đã nhập task vào
    else {
      const task = new Task(inputtask.value, userActive.username, false);
      //push task mới vào mảng
      todoArr.push(task);
      saveToStorage("todoTask", todoArr);
      console.log(todoArr);
      // gọi hàm để hiển thị
      displayTodoList();
      inputtask.value = ""; // reset dữ liêu từ form nhập
    }
  });

  function eventToggleTasks() {
    document.querySelectorAll("#todo-list li").forEach(function (li) {
      // thêm sự kiện vào các danh dách lilog
      li.addEventListener("click", function (e) {
        if (e.target !== li.children[0]) {
          li.classList.toggle("checked");
        }
        // kiểm tra todoArr của user
        const todo = todoArr.find(
          (todoItem) =>
            todoItem.owner === userActive.username &&
            todoItem.task === li.textContent.slice(0, -1)
        );
        // thay đổi thuộc tính isDone
        todo.isDone = li.classList.contains("checked") ? true : false;
        saveToStorage("todoTask", todoArr);
      });
    });
  }

  // xóa task ra khỏi dữ liệu
  function DeleteTask() {
    document.querySelectorAll("#todo-list .close").forEach(function (close) {
      // click vào dấu x để xoá từng task
      close.addEventListener("click", function () {
        const isdelete = confirm("are you sure?");
        if (isdelete) {
          // xoá task theo user đang login
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === close.parentElement.textContent.slice(0, -1)
          );
          todoArr.splice(index, 1);
          saveToStorage("todoTask", todoArr); // lưu vào storage
          displayTodoList();
        }
      });
    });
  }
} else {
  //nếu chưa đăng nhập thì báo
  alert("please login or register");
  // window.location.href = "/index.html";
}
