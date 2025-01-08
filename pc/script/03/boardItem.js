const updateBoardItem = (num, index, data) => {
  const container = document.querySelector(".board-container");
  container.innerHTML = "";

  let pageData = data.slice((index - 1) * num, (index - 1) * num + num);

  pageData.forEach((item) => {
    const card = document.createElement("a");
    card.style.display = "flex";
    card.className = "board-box";
    card.href = `detail.html?num=${item.num}`;
    card.innerHTML = `
        <p style="width: 7%">${item.num}</p>
        <p style="width: 68%; justify-content: flex-start; padding-left: 15px">${item.title}</p>
        <p style="width: 22%; color: #767676">${item.name}</p>
        <p style="width: 13%; color: #767676">${item.date}</p>
      `;
    container.appendChild(card);
  });
};

const updatePageBtn = (num, data) => {
  const pageContainer = document.querySelector(".page-container");
  let index = 1;

  pageContainer.innerHTML = "";
  updateBoardItem(num, 1, data);

  let totalPages = Math.ceil(data.length / num);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.textContent = i;

    if (i === index) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".page-button").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      index = i;
      updateBoardItem(num, index, data);
    });

    pageContainer.appendChild(button);
  }
};

updatePageBtn(10, boardData);

// category 반영
const onClickCategoryBox = () => {
  if (document.querySelector(".list-box").style.display === "none") {
    document.querySelector(".list-box").style.display = "flex";
    document.querySelector(".list-button").style.transform = "rotate(180deg)";
  } else {
    document.querySelector(".list-box").style.display = "none";
    document.querySelector(".list-button").style.transform = "rotate(0deg)";
  }
};

const onClickCategory = (event) => {
  searchData["category"] = event.target.id;
  document.querySelector(".category-input").value = event.target.innerText;
};

const onClickSearch = () => {
  searchData["text"] = document.querySelector(".search-input").value;

  const newData = boardData.filter((item) => {
    if (!searchData["text"]) return true;

    switch (searchData["category"]) {
      case "title":
        return item.title.includes(searchData["text"]);
      case "content":
        return item.content.includes(searchData["text"]);
      case "title-content":
        return item.title.includes(searchData["text"]) || item.content.includes(searchData["text"]);
      case "name":
        return item.name.includes(searchData["text"]);
      default:
        return false;
    }
  });

  updatePageBtn(10, newData);
};
