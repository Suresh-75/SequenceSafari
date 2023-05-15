const modalBtn = document.querySelector(".modalBtn");
const modal = document.querySelector(".modal");
const playBtn = document.querySelector(".playBtn");
const closeBtn = document.querySelector(".closeBtn")
const livesSlider = document.querySelector(".livesSlider");
const gridSlider = document.querySelector(".gridSlider");
const timeSlider = document.querySelector(".timeSlider");
let valuelives = document.querySelector(".valuelives")
let valueGrid = document.querySelector(".valueGrid")
let valueTime = document.querySelector(".valueTime")
const startGame = document.querySelector(".startGame")
livesSlider.oninput = function () {
    valuelives.textContent = this.value;
}
gridSlider.oninput = function () {
    valueGrid.textContent = this.value;
}
timeSlider.oninput = function () {
    valueTime.textContent = this.value;
}
modal.showModal();
closeBtn.addEventListener("click", () => {
    modal.close();
})
