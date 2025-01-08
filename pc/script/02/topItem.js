const topContainer = document.getElementById("recommend-top");
topContainer.innerHTML = "";

topData.forEach((item) => {
  const card = document.createElement("a");
  card.style.display = "block";
  card.className = "item-box";
  card.href = `detail.html?num=${item.num}`;
  card.innerHTML = `
      <img class="recommend-tag" src="../../image/02/recommend-tag.png" />
      <img src=${item.src} alt="item image" />
      <div class="info-top" style="height: 25%">
        <p class="info-title">${item.title}</p>
        <div class="info-box" style="height: 55%">
          <p class="info-text"><span>매매가</span> ${item.price}</p>
          <p class="info-text"><span>수익률</span> ${item.profit}</p>
        </div>
      </div>
      <div class="info-box" style="height: 25%">
        <p class="info-text"><span>지역</span> ${item.region}</p>
        <p class="info-text"><span>대지면적</span> ${item.area}</p>
        <p class="info-text"><span>연면적</span> ${item.area2}</p>
      </div>
  `;
  topContainer.appendChild(card);
});
