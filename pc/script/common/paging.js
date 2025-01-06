const pageContainer = document.querySelector(".page-container");

let index = 1;

const updatePageBtn = (num, updateFnc) => {
  pageContainer.innerHTML = "";

  let totalPages = Math.ceil(data.length / num);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.textContent = i;

    if (i === index) {
      button.style.fontWeight = "600";
    }

    button.addEventListener("click", () => {
      index = i;
      updateFnc(num, index);
    });

    pageContainer.appendChild(button);
  }
};
