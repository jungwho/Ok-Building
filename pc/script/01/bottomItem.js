const topContainer = document.getElementById("recommend-top");
topContainer.innerHTML = "";

topData.forEach((item) => {
  const card = document.createElement("a");
  card.style.display = "block";
  card.className = "item-box";
  card.innerHTML = `<img src=${item.src} alt="item image"/>`;
  topContainer.appendChild(card);
});
