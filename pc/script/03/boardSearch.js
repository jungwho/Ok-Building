function onClickSearchCategory() {
  const listBox = document.getElementById("list-box");
  // 토글을 위해 display 속성 변경
  if (listBox.style.display === "flex") {
    listBox.style.display = "none";
  } else {
    listBox.style.display = "flex";
  }
}

function onSelectCategory(element) {
  const input = document.getElementById("search-input");
  const listBox = document.getElementById("list-box");

  input.value = element.textContent;
  listBox.style.display = "none";
}
