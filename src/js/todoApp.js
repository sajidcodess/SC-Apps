const todoList = document.querySelector(".todo_list");
const todoForm = document.querySelector(".todo_app_form");
const todoinput = document.querySelector(".todo_app_input");

todoForm.addEventListener("submit", handleTodoSubmit);

function handleTodoSubmit(e) {
  e.preventDefault();
  const todoArr = [];

  let todoText = todoinput.value;
  todoArr.push(todoText);

  todoinput.value && todoMarkup(todoArr);

  todoinput.value = "";
}

function todoMarkup(storedList) {
  storedList.map((listItem) => {
    let todoElm = document.createElement("li");
    todoElm.classList.add("todo_list_item");
    let todoCheckbox = document.createElement("input");
    todoCheckbox.classList.add("todo_list_checkbox");
    todoCheckbox.type = "checkbox";
    let todoText = document.createElement("p");
    todoText.classList.add("todo_list_text");
    todoText.textContent = listItem;
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");

    deleteIcon.onclick = (e) => deleteListItem(e);
    todoCheckbox.onclick = () =>
      todoCheckbox.checked
        ? (todoText.style.color = "hsl(225, 14%, 43%)")
        : (todoText.style.color = "white");
    todoElm.append(todoCheckbox);
    todoElm.append(todoText);
    todoElm.append(deleteIcon);

    todoList.append(todoElm);
  });
}

function deleteListItem(e) {
  e.target.parentElement.remove();
}
