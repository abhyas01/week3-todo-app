const mainDiv = document.querySelector('#todos');
const mainInput = document.querySelector(".input-main");
const mainButton = document.querySelector(".main-btn");

let todos = [];
let idCounter = 0;

function addTodo() {
  todos.push({
    id: idCounter++,
    title: mainInput.value
  });
  mainInput.value = "";
  render();
}

function deleteTodo(todo) {
  todos = todos.filter((elem) => {
    return elem.id !== todo.id;
  });
  render();
}

function editTodo(todo, newVal){
  todos.forEach((elem) => {
    if(elem.id === todo.id){
      elem.title = newVal;
    }
  });
  render();
}

function editHandler(todo){
  const divElem = document.getElementById(todo.id);
  const p = divElem.querySelector("p");
  const editBtn = divElem.querySelector(".edit-btn");
  const textarea = document.createElement("textarea");
  textarea.value = p.textContent;
  textarea.classList.add('input-box');
  divElem.removeChild(p);
  divElem.insertBefore(textarea, divElem.firstChild);
  editBtn.textContent = "Done";
  editBtn.classList.remove("edit-btn");
  editBtn.classList.add("done-btn");
  editBtn.onclick = () => {
    editTodo(todo, textarea.value);
  };
}

function createTodoComponent(todo){
  const div = document.createElement('div');
  const div2 = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');
  const button2 = document.createElement('button');
  button.textContent = 'Delete';
  button2.textContent = 'Edit';
  button.onclick = () => { deleteTodo(todo);};
  button2.onclick = () => { editHandler(todo); };
  p.textContent = todo.title;
  div2.append(button);
  div2.append(button2);
  div.append(p);
  div.append(div2);
  div.setAttribute('id', todo.id);
  div.classList.add("todo-item");
  p.classList.add("todo-content");
  button.classList.add("delete-btn", "btn")
  button2.classList.add("edit-btn", "btn");
  return div;
}

function render() {
  mainDiv.innerHTML = "";
  for (let i = 0; i < todos.length; i++){
    const todo = todos[i];
    div = createTodoComponent(todo);
    mainDiv.appendChild(div);
  }
}

mainButton.addEventListener('click', addTodo);