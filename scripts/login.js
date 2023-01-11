"use strict";

// khai báo biến ban đầu
const btnLogin = document.getElementById("btn-submit");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

// click nút login
btnLogin.addEventListener("click", function () {
  const validateInput = function () {
    const userData = {
      username: inputUsername.value,
      password: inputPassword.value,
    };
    // check user name rỗng
    if (!userData.username) {
      alert("Please input user name");
      return false;
    }
    // check password rỗng
    else if (!userData.password) {
      alert("please input password");
      return false;
    } else {
      return true;
    }
  };

  const validate = validateInput();
  if (validate) {
    // kiểm tra username và password đã đăng ký hay chưa và có đúng hay ko
    const userData = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (userData) {
      //nếu userData có dữ liêu đúng đăng nhập thì
      alert("Logged in successfully ");
      let userActive = { ...userData, category: "Health", pageSize: 5 };
      saveToStorage("userActive", userActive); // lưu dũ liệu userActive
      window.location.assign("../index.html"); // chuyển đến trang home
    } else if (!userData) {
      // nếu user chưa đăng ký hoặc nhập sai pass
      alert("wrong password or this account is not registered");
    }
    saveToStorage("currentUser", userArr);
    return userData;
  }
});
// hàm xoá dữ liệu trên form
function clearInput() {
  inputUsername.value = "";
  inputPassword.value = "";
}
