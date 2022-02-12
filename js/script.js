// Dom references
const displayOperand = document.querySelector(".display-operand");
const displayResult = document.querySelector(".display-result");
const buttonArea = document.querySelector(".buttons-area");

// listen to click any button
buttonArea.addEventListener("click", function (e) {
  // stop bubbling
  // e.stopImmediatePropagation();

  if (e.target.classList.contains(".btn")) {
    console.log(e.target.value);
  }

  console.log(e.target);
  // console.log(e);
});
