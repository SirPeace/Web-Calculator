let dataObject = {
  value_1: null,
  value_2: null,
  action: null,
}

const output = document.querySelector("#output")
const buttons = document.querySelectorAll("button")
let isAction = false

buttons.forEach(button => {
  button.addEventListener("click", () => {
    handlePress(button)
    animate(button)
  })
})

function animate(btn) {
  btn.classList.add("animation")
  setTimeout(() => {
    btn.classList.remove("animation")
  }, 250)
}

function handlePress(button) {
  if (isFinite(button.dataset.value)) {
    if (isAction) {
      output.value = button.dataset.value
      isAction = false
    } else if (output.value != "0") {
      output.value += button.dataset.value
    } else {
      output.value = button.dataset.value
    }
  } else if (button.dataset.value == "dot" && output.value.indexOf(".") == -1) {
    output.value += "."
  } else if (button.dataset.value == "C" || button.dataset.value == "CE") {
    dataObject.value_1 = null
    dataObject.value_2 = null
    dataObject.action = null

    output.value = "0"
  } else if (button.dataset.value == "back") {
    output.value = output.value.slice(0, -1)
  } else if (button.dataset.value == "+/-") {
    output.value = output.value.startsWith("-")
      ? output.value.slice(1)
      : "-" + output.value
  } else if (button.dataset.action) {
    if (button.dataset.action != "equal" && output.value != NaN) {
      dataObject.value_1 = +output.value
      dataObject.action = button.dataset.action
      isAction = true
    } else {
      dataObject.value_2 = +output.value

      if (checkAttrs(dataObject)) {
        output.value = calculate(dataObject)
      } else {
        console.error("Data object isn't valid", dataObject)
      }
    }
  }
}

function checkAttrs(data) {
  if (isFinite(data.value_1) && isFinite(data.value_2) && data.action != null) {
    return true
  }

  return false
}

function calculate({ value_1: v1, value_2: v2, action }) {
  if (action === "/") return v1 / v2
  if (action === "*") return v1 * v2
  if (action === "+") return v1 + v2
  if (action === "-") return v1 - v2
}
