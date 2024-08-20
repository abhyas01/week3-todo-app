const mainDiv = document.querySelector('#todos');
const mainInput = document.querySelector(".input-main");
const mainButton = document.querySelector(".main-btn");

const todosObject = {
  todos: [],
  idCounter: 0
};

function addTodo() {
  if (mainInput.value.trim() === ""){
    alert("Please enter a todo item.");
    return;
  }
  todosObject.todos.push({
    id: todosObject.idCounter++,
    title: mainInput.value
  });
  localStorage.setItem("todosObject", JSON.stringify(todosObject));
  mainInput.value = "";
  render();
}

function deleteTodo(todo) {
  todosObject.todos = todosObject.todos.filter((elem) => {
    return elem.id !== todo.id;
  });
  localStorage.setItem("todosObject", JSON.stringify(todosObject));
  render();
}

function editTodo(todo, newVal){
  todosObject.todos.forEach((elem) => {
    if(elem.id === todo.id){
      elem.title = newVal;
    }
  });
  localStorage.setItem("todosObject", JSON.stringify(todosObject));
  render();
}

function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function editHandler(todo) {
  const divElem = document.getElementById(todo.id);
  const p = divElem.querySelector("p");
  const editBtn = divElem.querySelector(".edit-btn");
  const textarea = document.createElement("textarea");
  textarea.value = p.innerText;
  textarea.classList.add('input-box');
  divElem.removeChild(p);
  divElem.insertBefore(textarea, divElem.firstChild);
  autoResizeTextarea(textarea);  
  textarea.addEventListener('input', () => {
    autoResizeTextarea(textarea);
  });
  editBtn.blur();
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
  p.innerText = todo.title;
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
  for (let i = 0; i < todosObject.todos.length; i++){
    const todo = todosObject.todos[i];
    const div = createTodoComponent(todo);
    mainDiv.appendChild(div);
  }
}

mainButton.addEventListener('click', addTodo);

document.addEventListener('DOMContentLoaded', () => {
  try{
    const localObject = localStorage.getItem("todosObject");
    if(localObject === null){
      localStorage.setItem("todosObject", JSON.stringify(todosObject));
      render();
      return;
    }
    const todosObjectStored = JSON.parse(localObject);
    if (!todosObjectStored || Object.keys(todosObjectStored).length !== 2 || !Array.isArray(todosObjectStored.todos) || typeof (todosObjectStored.idCounter) !== 'number'){
      alert('Todo object has been compromised from your local storage; resetting the app!');
      localStorage.setItem("todosObject", JSON.stringify(todosObject));
    } else {
      todosObjectStored.todos.forEach((elem) => {
        if ((typeof(elem.id) !== 'number') || (typeof(elem.title) !== 'string')){
          throw Error('Todo object compromised');
        }
      });
      todosObject.todos = todosObjectStored.todos;
      todosObject.idCounter = todosObjectStored.idCounter;
    }
  } catch (err){
    alert('Todo object has been compromised from your local storage; resetting the app!');
    localStorage.setItem("todosObject", JSON.stringify(todosObject));
  } finally{
    render();
  }
});