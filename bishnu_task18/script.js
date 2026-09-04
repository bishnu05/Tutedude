// • Create an HTML file that includes the following elements:
// • Header with the text "Hello" initially.
// • Four boxes with text as red, blue, green, and yellow
// respectively.
// • An input field to get the user's name.
// • A button to greet the user.
// • Style the elements using CSS to make the layout visually
// appealing.
// • Implement JavaScript functionality to:
// • Change the greeting message in the header to "Hello,
// [name]" when the button is clicked.
// • Change the background colour of the boxes to the
// respective colour mentioned in the box when clicked.

let greeting = document.getElementById("greeting");
let nameInput = document.getElementById("nameInput");
let greetButton = document.getElementById("greetBtn");

let boxes = document.querySelectorAll(".color-box");

greetButton.addEventListener("click", function () {
  let name = nameInput.value.trim();

  if (name.trim() === "") {
    greeting.textContent = "Hello";
    return;
  }
  greeting.textContent = `Hello, ${name}`;
});

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    const color = box.dataset.color;
    box.style.backgroundColor = color;
    box.style.color = "white";
  });
});
