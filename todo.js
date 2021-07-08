const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_Ls = 'toDos';

let toDos = []; //const vs let 

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); // X를 누르면 HTML에서 리스트가 사라짐
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos //여기서 const toDos를 let toDos로 바꿔줌
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_Ls, JSON.stringify(toDos)); 
  // todolist 저장(string형태로 - javascript data에는 string형태로만 넣을 수 있음)
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; //나중에 지울때 뭘 지워야되는지 알아야되기때문에
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo); // X를 누르면 function 실행
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_Ls);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos); // parsing해줌
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit)
}

init();