// search-box -> show category-container
const onClickSearch = (event) => {
  const container = document.querySelector(".category-container");

  document.querySelectorAll(".search-box").forEach((item) => {
    item.style.border = "2px solid #cacad7";
  });

  event.currentTarget.style.border = "2px solid black";
  container.style.display = "block";

  if (event.currentTarget.id === "category01") {
    fetchCategory("서울", "../../page/common/search-category/01-01.html");
  }
  if (event.currentTarget.id === "category02") {
    fetchCategory("매물금액", "../../page/common/search-category/02.html");
  }
  if (event.currentTarget.id === "category03") {
    fetchCategory("매물용도", "../../page/common/search-category/03.html");
  }
  if (event.currentTarget.id === "category04") {
    fetchCategory("서울", "../../page/common/search-category/04.html");
  }

  document.body.addEventListener("click", onClickBody);
};

// body -> hide category-container
const onClickBody = (event) => {
  const container = document.querySelector(".category-container");

  if (event.target.closest("button")) {
    return;
  }

  if (!event.target.closest(".search") && !event.target.closest(".category-container")) {
    container.style.display = "none";

    document.querySelectorAll(".search-box").forEach((item) => {
      item.style.border = "2px solid #cacad7";
    });

    document.body.removeEventListener("click", onClickBody);
  }
};

// 체크박스 상태 적용
const applyCheckbox = (name) => {
  const selectedCheckboxes = categoryData[name] || [];
  const allCheckboxes = document.querySelectorAll('.input-container input[type="checkbox"]');

  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = selectedCheckboxes.includes(checkbox.id);
  });
};

const onClickExit = (category, item) => {
  categoryData[category] = categoryData[category].filter((data) => data !== item);

  const checkbox = document.getElementById(item);
  if (checkbox) {
    checkbox.checked = false;
  }

  updateCategoryList();
};

// update category container
const updateCategoryList = () => {
  const tagContainer = document.querySelector(".tag-container");
  tagContainer.innerHTML = ""; // 기존 항목 초기화

  // 각 카테고리별 항목을 추가
  for (const category in categoryData) {
    categoryData[category].forEach((item) => {
      const tag = document.createElement("div");
      tag.classList.add("tag");

      tag.innerHTML = `
      <p>${category}>${item}</p>
      <button onclick="onClickExit('${category}', '${item}')"><img src="../../image/common/exit.png"/></button>
      `;
      tagContainer.appendChild(tag);
    });
  }
};

// button -> fetch category
const fetchCategory = (name, page) => {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".category-top").innerHTML = data;
      applyCheckbox(name);
      updateCategoryList();
    });
};

// reset check box
const onClickReset = (name) => {
  const allCheckboxes = document.querySelectorAll('.input-container input[type="checkbox"]');
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  categoryData[name] = [];
  updateCategoryList();
};

// change '전체' check box
const onChangeAll = (name) => {
  const btn = event.target;
  const boxes = Array.from(document.querySelectorAll('.input-container input[type="checkbox"]')).filter((box) => box !== btn);

  // checked
  if (btn.checked) {
    boxes.forEach((checkbox) => (checkbox.checked = false));
    categoryData[name] = ["전체"];
  }

  // unchecked
  if (!btn.checked) {
    categoryData[name] = categoryData[name].filter((item) => item !== event.target.id);
  }
  updateCategoryList();
};

// change check box
const onChangeCheckBox = (name) => {
  const btn = event.target;

  // checked
  if (btn.checked) {
    categoryData[name].push(event.target.id);

    // 전체 버튼 해제
    if (document.getElementById("전체") && document.getElementById("전체").checked) {
      document.getElementById("전체").checked = false;
      categoryData[name] = categoryData[name].filter((item) => item !== "전체");
    }
  }

  // unchecked
  if (!btn.checked) {
    categoryData[name] = categoryData[name].filter((item) => item !== event.target.id);
  }

  updateCategoryList();
};

const onClickSearchText = () => {
  const text = document.getElementById("search-text").value;
  if (text) {
    categoryData["검색어"].push(text);
    updateCategoryList();
  }
};

const onClickAllReset = () => {
  onClickReset("서울");
  onClickReset("경기");
  onClickReset("인천");
  onClickReset("그외지역");
  onClickReset("매물금액");
  onClickReset("매물용도");
  onClickReset("검색어");
};

const onClickSubmit = () => {
  document.querySelector(".category-container").style.display = "none";
  document.querySelectorAll(".search-box").forEach((item) => {
    item.style.border = "2px solid #cacad7";
  });

  const isData = Object.values(categoryData).some((array) => array.length > 0);

  if (isData) {
    sessionStorage.setItem("category-data", JSON.stringify(categoryData));
    if (window.location.pathname === "/index.html") window.location.href = "../../page/02/01.html#recommend-bottom";
    else {
      console.log(window.location.pathname);
      window.location.reload();
    }
  }
};
