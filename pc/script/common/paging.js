const pageContainer = document.querySelector(".page-container");

let index = 1;

const updatePageBtn = (num) => {
  pageContainer.innerHTML = "";
  updateFnc(num, 1); // updateFnc 넣기

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
      updateFnc(num, index); // updateFnc 넣기
    });

    pageContainer.appendChild(button);
  }
};
