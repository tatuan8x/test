"use strict";

if (userActive) {
  // khai báo ban đầu
  const btnSubmit = document.getElementById("btn-submit");
  const searchInput = document.getElementById("input-query");
  const prev = document.getElementById("btn-prev");
  const next = document.getElementById("btn-next");
  const num = document.getElementById("page-num");
  const container = document.getElementById("news-container");
  const arrActive = getFromStorage("userActive");
  console.log(arrActive);

  let totalResults = 10; // Tổng số kết quả tìm kiếm

  // nhập từ khoá muốn tìm
  searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnSubmit.click();
    }
  });
  btnSubmit.addEventListener("click", function () {
    num.textContent = 1; // reset num về giá trị ban đầu
    let keyword = document.getElementById("input-query").value;
    // Kiểm tra nếu chưa nhập từ khoá
    if (!keyword) {
      alert("please input search");
      return;
    }
    getDataNews(keyword, arrActive);
  });

  // get api news
  async function getDataNews(keyword, pageSize) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${keyword}&pageSize=${pageSize}&apiKey=3414c718576b4963a71705f932a5fecf`
      );
      const data = await res.json();

      displayNewList(data);
    } catch (err) {
      alert("đã bị lỗi");
    }
  }

  // render ra page
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkPrev();
    checkNext();
    let html = ""; // tạo một chuỗi rỗng , để các news hiển thị
    data.articles.forEach(function (data) {
      html += `
      <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
          <div class="row no-gutters">
              <div class="col-md-4">
                  <img src="${data.urlToImage}" class="card-img"
                      alt="img
                      ">
              </div>
              <div class="col-md-8">
                  <div class="card flex-row flex-wrap" c >
                      <div class="card-img" class="p-4 p-md-5 pt-5">
                          
                      </div>
                          
                          <div  class="card-body">
                          <h4  class="card-title"> ${data.title}</h4>
                          <p class="card-text"> ${data.description}</p>
                          
                              <a href="${data.url}" target="_blank" class="btn btn-primary" >View</a>
                          
                          </div>
                   </div>
              </div>
          </div>
      </div>
  </div>`;
    });
    container.innerHTML = html;
  }

  // click nút next
  next.addEventListener("click", function () {
    getDataNews(
      "us",
      ++num.textContent,
      arrActive.category,
      arrActive.pageSize
    );
  });

  // click nút prev
  prev.addEventListener("click", function () {
    getDataNews(
      "us",
      --num.textContent,
      arrActive.category,
      arrActive.pageSize
    );
  });

  // hàm kiểm tra nút prev
  function checkPrev() {
    // nếu đang ở trang 1 thì ẩn nút prev
    if (num.textContent == 1) {
      prev.style.display = "none";
    } else {
      prev.style.display = "block";
    }
  }
  // hàm kiểu tra nút next
  function checkNext() {
    // nếu ko lấy đc bài viết có liên qan đến từ khoá cần tìm nữa thì ẩn nút next
    if (num.textContent >= Math.ceil(totalResults / arrActive.pageSize)) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }
} else {
  //nếu chưa đăng nhập thì báo
  alert("please login or register");
  // window.location.href = "/index.html";
}
