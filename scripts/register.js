"use strict";

// khai báo biến ban đầu
const btnRegister = document.getElementById("btn-submit");
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");

// click nút register
btnRegister.addEventListener("click", function () {
  // lấy data từ form
  const userData = {
    firstname: inputFirstname.value,
    lastname: inputLastname.value,
    username: inputUsername.value,
    password: inputPassword.value,
    passwordconfirm: inputPasswordConfirm.value,
  };

  // validate data
  const validateInput = function () {
    // check trùng username
    for (let i = 0; i < userArr.length; i++) {
      if (userData.username === userArr[i].username) {
        alert("Username has been set");
        return false;
      }
    }
    // check first name rỗng
    if (!userData.firstname) {
      alert("Please input for firstname");
      return false;
    }
    // check last name rỗng
    else if (!userData.lastname) {
      alert("Please input for lastname");
      return false;
    }
    // check user name rỗng
    else if (!userData.username) {
      alert("Please input for username");
      return false;
    }
    // check độ dài password
    else if (userData["password"].length < 8) {
      alert("Your password must be at least 8 characters long!");
      return false;
    }
    // check confirm pass rỗng
    else if (!userData.passwordconfirm) {
      alert("please input confirm password");
      return false;
    }
    // check confirm password
    else if (userData["password"] !== userData["passwordconfirm"]) {
      alert("Confirm Password does not match!");
      return false;
    } else {
      return true;
    }
  };
  const validate = validateInput(userData);
  //validate dữ liệu
  if (validate) {
    userArr.push(userData);
    clearInput();
    saveToStorage("userArr", userArr);
    alert("Sign Up Success");
    window.location.href = "../pages/login.html"; // chuyển đến trang login
  }
});

// xoá dữ liệu nhập trong form input
function clearInput() {
  inputFirstname.value = "";
  inputLastname.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
}
