const allCheckBoxes = document.querySelectorAll(".custom-checkbox");
const allInputFields = document.querySelectorAll(".checkInput");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-bar-inner");
const progressCount = document.querySelector(".progress-count");
const progressBarLabel = document.querySelector(".progress-label");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let goalQoutes = {
  start: "Raise the bar by completing your tasks... !",
  working: "Just few steps away, keep going 🤘!",
  completed: "Wow... ! You just completed all the goals 💯!",
};
// console.log(allGoals);

let completedGoals = Object.values(allGoals);
// console.log(completedGoals)

// Handle Progress bar -
let completedGoalsCount = completedGoals.filter((goals) => goals.isCompleted).length;
progressLabel.style.width = `${(completedGoalsCount / allInputFields.length) * 100}%`;

progressCount.textContent = `${completedGoalsCount} / ${allInputFields.length} Completed`;

// Handle quotes-
if (completedGoalsCount == 0) {
  progressBarLabel.textContent = goalQoutes.start;
} else if (completedGoalsCount == allInputFields.length) {
  progressBarLabel.textContent = goalQoutes.completed;
} else {
  progressBarLabel.textContent = goalQoutes.working;
}

allCheckBoxes.forEach((checkBox) => {
  // console.log(checkBox)
  checkBox.addEventListener("click", (e) => {

    // check all input field values using every method -
    const allInputFieldsFilled = [...allInputFields].every(
      (input) => input.value
    );

    if (allInputFieldsFilled) {
      checkBox.parentElement.classList.toggle("completed");

      const inputId = checkBox.nextElementSibling.id;

      allGoals[inputId].isCompleted = !allGoals[inputId].isCompleted;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      let completedGoals = Object.values(allGoals);

      // progress bar --
      completedGoalsCount = completedGoals.filter((goals) => goals.isCompleted).length;
      console.log(completedGoalsCount)
      progressLabel.style.width = `${(completedGoalsCount / allInputFields.length) * 100}%`;
      progressCount.textContent = `${completedGoalsCount} / ${allInputFields.length} Completed`;

      if (completedGoalsCount == 0) {
        progressBarLabel.textContent = goalQoutes.start;
      } else if (completedGoalsCount == allInputFields.length) {
        progressBarLabel.textContent = goalQoutes.completed;
      } else {
        progressBarLabel.textContent = goalQoutes.working;
      }
      
    } else {
      errorLabel.classList.add("show-error");
    }
  });
});

allInputFields.forEach((input) => {
  // set Initial value from local storage.
  input.value = allGoals[input.id]?.value || "";

  // to add completed class to element when condition true
  if (allGoals[input.id]?.isCompleted) {
    input.parentElement.classList.add("completed");
  }

  // remove error line when typing...
  input.addEventListener("focus", () => {
    errorLabel.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    // after click checkbox input field can't be edited
    if (allGoals[input.id]?.isCompleted) {
      e.target.value = allGoals[input.id].value;
      return;
    }

    allGoals[input.id]
      ? (allGoals[input.id].value = input.value)
      : (allGoals[input.id] = { value: input.value, isCompleted: false });

    // console.log(allGoals)
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
