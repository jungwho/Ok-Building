const updateBestItem = (num, index) => {
  const container = document.getElementById("best");
  container.innerHTML = "";

  let pageData = bestData.slice((index - 1) * num, (index - 1) * num + num);

  pageData.forEach((item) => {
    const card = document.createElement("a");
    card.style.display = "block";
    card.className = "item-box";
    card.href = `detail.html?num=${item.num}`;
    card.innerHTML = `
        <img src=${item.src} alt="item image" />
        <div class="info-top" style="height: 16%">
          <p class="info-title">${item.title}</p>
          <div class="info-box">
            <p class="info-text"><span>거래금액</span> ${item.price}</p>
          </div>
        </div>
        <div class="info-box" style="height: 36%">
          <p class="info-text"><span>지역</span> ${item.region}</p>
          <p class="info-text"><span>대지면적</span> ${item.area}</p>
          <p class="info-text"><span>연면적</span> ${item.area2}</p>
          <p class="info-text"><span>층수</span> ${item.floor}</p>
          <p class="info-text"><span>거래시기</span> ${item.date}</p>
        </div>
    `;
    container.appendChild(card);
  });
};

const updatePageBtn = (num) => {
  const pageContainer = document.querySelector(".page-container");
  let index = 1;

  pageContainer.innerHTML = "";
  updateBestItem(num, 1);

  let totalPages = Math.ceil(bestData.length / num);

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
      updateBestItem(num, index);
    });

    pageContainer.appendChild(button);
  }
};

updatePageBtn(16);
