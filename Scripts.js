const numberButtons = document.querySelectorAll("[data-number]"),
  operationButtons = document.querySelectorAll("[data-operator]"),
  equalsButton = document.querySelector("[data-equals]"),
  deleteButton = document.querySelector("[data-delete]"),
  allClearButton = document.querySelector("[data-all-clear]"),
  previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  ),
  currentOperandTextElement = document.querySelector("[data-current-operand]");
class Calculator {
  constructor(a, b) {
    (this.previousOperandTextElement = a),
      (this.currentOperandTextElement = b),
      this.clear();
  }
  formatDisplayNumber(a) {
    const b = a.toString(),
      c = parseFloat(b.split(".")[0]),
      d = b.split(".")[1];
    let e;
    return (
      (e = isNaN(c)
        ? ""
        : c.toLocaleString("en", { maximumFractionDigits: 0 })),
      null == d ? e : `${e}.${d}`
    );
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  calculate() {
    let a;
    const b = parseFloat(this.previousOperand),
      c = parseFloat(this.currentOperand);
    if (!(isNaN(b) || isNaN(c))) {
      switch (this.operation) {
        case "+":
          a = b + c;
          break;
        case "-":
          a = b - c;
          break;
        case "\xF7":
          a = b / c;
          break;
        case "*":
          a = b * c;
          break;
        default:
          return;
      }
      (this.currentOperand = a),
        (this.operation = void 0),
        (this.previousOperand = "");
    }
  }
  chooseOperation(a) {
    "" === this.currentOperand ||
      ("" !== this.previousOperand && this.calculate(),
      (this.operation = a),
      (this.previousOperand = this.currentOperand),
      (this.currentOperand = ""));
  }
  appendNumber(a) {
    (this.currentOperand.includes(".") && "." === a) ||
      (this.currentOperand = `${this.currentOperand}${a.toString()}`);
  }
  clear() {
    (this.currentOperand = ""),
      (this.previousOperand = ""),
      (this.operation = void 0);
  }
  updateDisplay() {
    (this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`),
      (this.currentOperandTextElement.innerText = this.formatDisplayNumber(
        this.currentOperand
      ));
  }
}
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
for (const a of numberButtons)
  a.addEventListener("click", () => {
    calculator.appendNumber(a.innerText), calculator.updateDisplay();
  });
for (const a of operationButtons)
  a.addEventListener("click", () => {
    calculator.chooseOperation(a.innerText), calculator.updateDisplay();
  });
allClearButton.addEventListener("click", () => {
  calculator.clear(), calculator.updateDisplay();
}),
  equalsButton.addEventListener("click", () => {
    calculator.calculate(), calculator.updateDisplay();
  }),
  deleteButton.addEventListener("click", () => {
    calculator.delete(), calculator.updateDisplay();
  });
