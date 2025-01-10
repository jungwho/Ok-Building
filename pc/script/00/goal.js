let index = 0;
const sliders = document.querySelectorAll(".slider");

const onClickPrev = () => {
  if (index > 0) {
    index--;
    sliders[0].style.transform = `translateX(-${index * 100}%)`;
    sliders[1].style.transform = `translateX(-${index * 100}%)`;
  }
};

const onClickNext = () => {
  const totalSlides = sliders[0].children.length;
  if (index < totalSlides - 1) {
    index++;
    sliders[0].style.transform = `translateX(-${index * 100}%)`;
    sliders[1].style.transform = `translateX(-${index * 100}%)`;
  }
};
