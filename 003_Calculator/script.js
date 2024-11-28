const buttons = document.querySelectorAll(".buttons");
const resultInput = document.getElementById("result");
let resultString = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", ({ target }) => {
    const value = target.value;

    switch (value) {
      case "=":
        try {
          resultString = eval(resultString) || ""; // Prevents undefined
        } catch {
          resultString = "Error";
        }
        break;

      case "AC":
        resultString = "";
        break;

      case "%":
        if (resultString) {
          try {
            resultString = String(eval(resultString) / 100);
          } catch {
            resultString = "Error";
          }
        }
        break;

      case "back":
        resultString = resultString.slice(0, -1);
        break;

      case ".":
        if (!resultString.endsWith(".")) {
          resultString += ".";
        }
        break;

      default:
        resultString += value;
    }

    resultInput.value = resultString || "0";
  });
});
