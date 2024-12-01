const buttons = document.querySelectorAll(".buttons");
const resultInput = document.getElementById("result");
let resultString = "";
let M_plus = localStorage.getItem("M_plus") || [];
let M_minus = localStorage.getItem("M_minus") || [];

buttons.forEach((btn) => {
  btn.addEventListener("click", ({ target }) => {
    const value = target.value;

    switch (value) {
      case "=":
        resultString = resultString.toString()
        try {
          // console.log(typeof(resultString))
          if (!resultString.startsWith("0")) {
            if(typeof(resultString) == "string"){
              resultString = eval(resultString) || ""
            } else{
              resultString = resultString
            }
          } else {
            if (typeof(resultString) == "string") {
              resultString = resultString.substring(1);
              resultString = eval(resultString) || "";
            } else{
              resultString = resultString
            }
          }
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
        if (resultString.length > 0) {
          resultString = resultString.slice(0, -1);
        }
        break;

      case ".":
        if (!resultString.endsWith(".")) {
          resultString += ".";
        }
        break;

      case "M+":
        if (resultString) {
          M_plus.push(resultString);
          resultString = "";
          localStorage.setItem("M_plus", M_plus);
        }
        break;

      case "M-":
        if (resultString) {
          M_minus.push(resultString);
          resultString = "";
          localStorage.setItem("M_minus", M_minus);
        }
        break;

      case "MRC":
        let mrc = 0;
        if (M_plus.length > 0) {
          for (const element of M_plus) {
            mrc += element;
          }
        }
        if (M_minus.length > 0) {
          for (const element of M_minus) {
            mrc -= element;
          }
        }

        resultString = mrc;
        M_plus = [];
        M_minus = [];
        localStorage.setItem("M_plus", M_plus);
        localStorage.setItem("M_minus", M_minus);
        break;

      default:
        resultString += value;
    }

    resultInput.value = resultString;
  });
});
