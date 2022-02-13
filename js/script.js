// Dom references
const displayOperand = document.querySelector(".display-operand");
const displayResult = document.querySelector(".display-result");
const buttonArea = document.querySelector(".buttons-area");

// initial input condition
let inputArr = [];
let inputAtSingle = "";

// listen to click any button
buttonArea.addEventListener("click", function (e) {
  let { id } = e.target;
  let displayOperandText = displayOperand.innerText;
  const isNumberKey = e.target.className.includes("number-key");
  const isOperatorKey = e.target.className.includes("operator-key");

  if (isNumberKey || isOperatorKey) {
    // set operand text
    displayOperand.innerText += e.target.innerText;
    // set input at single
    inputAtSingle += !isOperatorKey ? e.target.innerText : "";

    // check operator key pressed
    if (isOperatorKey) {
      inputArr.push(inputAtSingle);
      inputArr.push(e.target.innerText);
      inputAtSingle = "";
    }
  }

  if (id == "equal") {
    inputArr.push(inputAtSingle);
    // display result
    displayResult.innerText = calculation(inputArr);
  }

  // remove last entry
  if (id === "back" && displayOperandText !== "") {
    // remove last entry
    displayOperand.innerText = displayOperandText.slice(
      0,
      displayOperandText.length - 1
    );

    // if (inputAtSingle !== "") {
    //   console.log("inputAtSingle before", inputAtSingle);
    //   inputAtSingle = inputAtSingle.slice(0, inputAtSingle.length - 1);
    //   console.log("inputAtSingle after", inputAtSingle);
    // }
  }

  // remove all input
  if (id === "clear") {
    displayOperand.innerText = "";
    inputAtSingle = "";
    inputArr = [];
  }
});

// Calculation or perform operation
function calculation(inputs) {
  let calculatedValue;
  if (inputs.length === 1) {
    // calculatedValue = inputs[0];
    // console.log("Final Result ", calculatedValue);
    return inputs[0];
  } else {
    let operationResult;

    if (inputs.indexOf("/") > -1) {
      operationResult = performOperation(inputs, inputs.indexOf("/"), "/");
    } else if (inputs.indexOf("*") > -1) {
      operationResult = performOperation(inputs, inputs.indexOf("*"), "*");
    } else if (inputs.indexOf("+") > -1) {
      operationResult = performOperation(inputs, inputs.indexOf("+"), "+");
    } else {
      operationResult = performOperation(inputs, inputs.indexOf("-"), "-");
    }

    return calculation(operationResult);
  }

  // return calculatedValue;
}

// make a operation
function performOperation(inputs, index, operator) {
  const prevInputs = inputs.slice(0, index);
  const nextInputs = inputs.slice(index + 1);

  // console.log("inputs", inputs);
  // console.log("index", index);
  // console.log("pevInputs", prevInputs);
  // console.log("nextInputs", nextInputs);

  let result,
    operatedInputs = [];

  switch (operator) {
    case "/":
      result = Number(prevInputs.pop()) / Number(nextInputs.shift());
      break;
    case "*":
      result = Number(prevInputs.pop()) * Number(nextInputs.shift());
      break;
    case "+":
      result = Number(prevInputs.pop()) + Number(nextInputs.shift());
      break;
    case "-":
      result = Number(prevInputs.pop()) - Number(nextInputs.shift());
      break;
    default:
      console.log("Syntax Error");
  }

  operatedInputs = [...prevInputs, result, ...nextInputs];

  return operatedInputs;
}
