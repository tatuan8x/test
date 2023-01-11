"use strict";
if (userActive) {
  // khai báo biến ban đầu
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const saveSettings = document.getElementById("btn-submit");

  // click vào nút save settings
  saveSettings.addEventListener("click", function () {
    if (validate()) {
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inputCategory.value;
      saveToStorage("userArr", userArr);
      const index = userArr.findIndex(
        (item) => item.username === userActive.username
      );
      userArr[index] = userActive;
      saveToStorage("userActive", userActive);

      console.log(userActive);
      alert("successful");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  function validate() {
    // check input rỗng hay ko và chỉ đc phép nhập số
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("please input number");
      return false;
    }
    // check category đã chọn hay chưa
    else if (inputCategory.value === "General") {
      alert("please chosse category");
      return false;
    } else {
      return true;
    }
  }
} else {
  //nếu chưa đăng nhập thì báo
  alert("please login or register");
  window.location.href = "/index.html";
}
