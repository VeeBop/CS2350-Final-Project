const canvas = document.getElementById("pickedColor");
const ctx = canvas.getContext("2d");

function updateColor() {
  redHex = parseInt(document.getElementById("redSlider").value)
    .toString(16)
    .padStart(2, "0");
  greenHex = parseInt(document.getElementById("greenSlider").value)
    .toString(16)
    .padStart(2, "0");
  blueHex = parseInt(document.getElementById("blueSlider").value)
    .toString(16)
    .padStart(2, "0");
  color = `#${redHex}${greenHex}${blueHex}`;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("hexColor").textContent = color;
}

document.getElementById("redSlider").oninput = function () {
  document.getElementById("redNumber").textContent =
    document.getElementById("redSlider").value;
  updateColor();
};

document.getElementById("greenSlider").oninput = function () {
  document.getElementById("greenNumber").textContent =
    document.getElementById("greenSlider").value;

  updateColor();
};

document.getElementById("blueSlider").oninput = function () {
  document.getElementById("blueNumber").textContent =
    document.getElementById("blueSlider").value;

  updateColor();
};

updateColor();
