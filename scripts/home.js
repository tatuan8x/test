"use strict";

// khai báo biến ban đầu
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const Logout = document.getElementById("btn-logout");

// hiển thị nội dung trang home tên đang đăng nhập
function displayhome() {
  console.log(userActive);
  // nếu user đăng nhập thành công
  if (userActive) {
    loginModal.style.display = "none"; // ẩn nút login và register
    mainContent.style.display = "block"; // hiện nội dung trang
    welcomeMessage.textContent = `Welcome ${userActive.firstname}`; // hiển thị chữ welcome + firstname của user
  }
  // nếu chưa đăng nhập
  else {
    loginModal.style.display = "block"; // hiện nút login và register
    mainContent.style.display = "none"; // ẩn nội dung trang
  }
}
// chức năng log out
Logout.addEventListener("click", function () {
  const isLogout = confirm("are you sure?");
  // nếu đã logout
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayhome(); // hiện lại trang chủ login và register
  }
});

displayhome();
