const canvas = document.getElementById("reactionCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
const ctx = canvas.getContext("2d");
ctx.font = "2rem monospace";
const greenBack = "#84B66B";
const redBack = "#FA4C7B";
const blueBack = "#32A7EB";
const textColor = "#252623";

// Variable that holds whether we are waiting to start, counting down, or
// waiting for a click
var state = "start";
// Variable to track the start of the reaction time
var startTime;
var reactionTime;

ctx.fillStyle = greenBack;
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = textColor;
drawCenteredText("Click anywhere in the green to begin");

// Helper function to draw text that is actually centered on a canvas
// Also will attempt to wrap text if necessary
// https://stackoverflow.com/questions/13771310/center-proportional-font-text-in-an-html5-canvas
function drawCenteredText(text, heightOffset = 0) {
  textWidth = ctx.measureText(text).width;
  textHeight = ctx.measureText(text).emHeightAscent;

  if (textWidth > canvas.width) {
    numToWrap = Math.floor(textWidth / canvas.width) + 1;
    for (var i = 0; i < numToWrap; i++) {
      textSplit = Math.floor(text.length / numToWrap);
      drawCenteredText(
        text.substring(textSplit * i, textSplit * i + textSplit),
        -(textHeight * i) + (textHeight * numToWrap) / 2,
      );
    }
  } else {
    ctx.fillText(
      text,
      canvas.width / 2 - textWidth / 2,
      canvas.height / 2 - heightOffset,
    );
  }
}

canvas.onmousedown = async function () {
  if (state == "start") {
    state = "counting";
    ctx.fillStyle = redBack;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    drawCenteredText("Click once the background is blue...");

    // Wait time is up to ten seconds
    var waitTime = Math.floor(Math.random() * 9000 + 1000);

    await new Promise((r) => setTimeout(r, waitTime));

    if (state == "tooSoon") {
      state = "start";

      ctx.fillStyle = greenBack;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      drawCenteredText("Click anywhere in the green to restart");
    } else {
      state = "waiting";
      startTime = performance.now();

      ctx.fillStyle = blueBack;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      drawCenteredText("Click!");
    }
  } else if (state == "counting") {
    state = "tooSoon";
    ctx.fillStyle = redBack;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    drawCenteredText("Too soon! Wait and try again");
  } else if (state == "waiting") {
    state = "start";
    var endTime = performance.now();

    reactionTime = endTime - startTime;

    ctx.fillStyle = greenBack;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    drawCenteredText(`Your reaction was ${reactionTime} milliseconds!`);
  }
};
