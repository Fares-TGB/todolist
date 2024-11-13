import "./style.css";

const form = document.getElementById("myForm");
const taskList = document.getElementById("taskList");
const inputElement = document.querySelector("input[name ='newTask']");
let taskNumber = 0;

const taskDone = (event) => {
  const divOfTheTask = event.currentTarget.closest(".newTask");
  const divId = divOfTheTask.id;
  // @ts-ignore
  const data = JSON.parse(localStorage.getItem(divId));

  const textElement = divOfTheTask.querySelector("li");

  if (textElement.classList.contains("taskUndone")) {
    textElement.classList.remove("taskUndone");
    textElement.classList.add("taskDone");
    data.completed = true;
    localStorage.setItem(divId, JSON.stringify(data));
  } else if (textElement.classList.contains("taskDone")) {
    textElement.classList.remove("taskDone");
    textElement.classList.add("taskUndone");
    data.completed = false;
    localStorage.setItem(divId, JSON.stringify(data));
  } else {
    textElement.classList.add("taskDone");
    data.completed = true;
    localStorage.setItem(divId, JSON.stringify(data));
  }
};

const taskModify = (event) => {
  const divOfTheTask = event.currentTarget.closest(".newTask");
  const textElement = divOfTheTask.querySelector("li");
  const text = textElement.textContent;
  inputElement.value = text;
  const divId = divOfTheTask.id;
  // @ts-ignore
  localStorage.removeItem(divId);
  divOfTheTask.remove();
};

const taskDelete = (event) => {
  const divOfTheTask = event.currentTarget.closest(".newTask");
  const divId = divOfTheTask.id;
  // @ts-ignore
  localStorage.removeItem(divId);

  divOfTheTask.remove();
};

const createButtonDelete = () => {
  const buttonDelete = document.createElement("button");
  const iconDelete = document.createElement("i");
  buttonDelete.addEventListener("click", (event) => {
    taskDelete(event);
  });
  iconDelete.classList.add("fa-solid", "fa-trash-can");
  buttonDelete.classList.add("button");
  buttonDelete.appendChild(iconDelete);

  return buttonDelete;
};

const createButtonModify = () => {
  const buttonModify = document.createElement("button");
  buttonModify.addEventListener("click", (event) => {
    taskModify(event);
  });

  const iconModify = document.createElement("i");
  iconModify.classList.add("fa-solid", "fa-pen");
  buttonModify.classList.add("button");
  buttonModify.appendChild(iconModify);

  return buttonModify;
};

const createButtonDone = () => {
  const buttonDone = document.createElement("button");
  const iconDone = document.createElement("i");
  buttonDone.addEventListener("click", (event) => {
    taskDone(event);
  });
  iconDone.classList.add("fa-solid", "fa-check");
  buttonDone.classList.add("button");
  buttonDone.appendChild(iconDone);

  return buttonDone;
};

const allButtons = () => {
  const div = document.createElement("div");
  div.appendChild(createButtonModify());
  div.appendChild(createButtonDone());
  div.appendChild(createButtonDelete());
  div.classList.add("allButtons");

  return div;
};

const saveTaskInLocaleStorage = (input, taskId) => {
  const taskData = {
    id: taskId,
    text: input,
    completed: false,
  };

  const taskDataJson = JSON.stringify(taskData);

  localStorage.setItem(taskId, taskDataJson);
};

form?.addEventListener("submit", (event) => {
  event?.preventDefault();

  // @ts-ignore
  const formData = new FormData(event.currentTarget);
  const input = formData.get("newTask");
  if (input != "") {
    const newTask = document.createElement("div");
    const text = document.createElement("li");
    text.classList.add("text-2xl", "font-bold");
    taskNumber += 1;
    const taskId = `task${taskNumber}`;
    newTask.id = taskId;

    // @ts-ignore
    text.innerHTML = input;

    newTask.appendChild(text);
    newTask.appendChild(allButtons());
    newTask.classList.add("newTask");

    taskList?.appendChild(newTask);
    saveTaskInLocaleStorage(input, taskId);

    // @ts-ignore
    inputElement.value = "";

    // @ts-ignore
  }
});

window.addEventListener("load", () => {
  let maxTaskNumber = 0;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("task")) {
      const storedTask = localStorage.getItem(key);

      if (storedTask) {
        const data = JSON.parse(storedTask);
        const newTask = document.createElement("div");
        const text = document.createElement("li");
        text.classList.add("text-2xl", "font-bold");
        newTask.id = data.id;
        text.innerHTML = data.text;
        newTask.appendChild(text);
        newTask.appendChild(allButtons());
        newTask.classList.add("newTask");

        taskList?.appendChild(newTask);

        let number = parseInt(key.replace("task", ""), 10);
        if (number > maxTaskNumber) {
          maxTaskNumber = number;
        }

        if (data.completed) {
          text.classList.add("taskDone");
        }
      }
    }
  });
  taskNumber = maxTaskNumber;
  console;
});
