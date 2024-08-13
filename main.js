const form = document.querySelector("#itemForm"); // select form
const itemInput = document.querySelector("#itemInput"); // select input box from form
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addBtn = document.querySelector("#addItem");
const clearButton = document.querySelector("#clearItem");

const tailwindCSS = document.head.querySelector(
  "script[src='https://cdn.tailwindcss.com']"
);

tailwindCSS && console.log("Tailwind CSS is loaded");

let todoItems = [];

// TODO: Handle item
const handleItem = function (itemName) {
  const items = itemList.querySelectorAll(".item");

  items.forEach((item) => {
    // ! To avoid the error of the item name being undefined
    if (
      item.querySelector(".item-name").textContent.trim().toLowerCase() ===
      itemName.trim().toLowerCase()
    ) {
      //TODO: Complete event listener

      item
        .querySelector(".complete-item")
        .addEventListener("click", function () {
          let itemText = item.querySelector(".item-name");
          let itemIndex = item.querySelector(".item-index");
          console.log(itemText);
          itemText.classList.toggle("completed");
          itemIndex.classList.toggle("completed");
          // Tailwind CSS classes
          itemText.classList.toggle("line-through");
          itemText.classList.toggle("text-slate-400");
          itemIndex.classList.toggle("border-green-500");
          itemIndex.classList.toggle("text-slate-400");

          if (itemText.classList.contains("completed")) {
            sendFeedback(`Item Completed`, "green");
          }
        });
      //TODO: Edit event listener
      item.querySelector(".edit-item").addEventListener("click", function () {
        addBtn.innerHTML = "Edit Item";
        itemInput.value = itemName;
        itemList.removeChild(item);

        todoItems = todoItems.filter((item) => {
          return item !== itemName;
        });
        setLocalStorage(todoItems);
      });
      //TODO: Delete event listener
      item.querySelector(".delete-item").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this item?")) {
          itemList.removeChild(item);

          todoItems = todoItems.filter(function (item) {
            return item !== itemName;
          });
          setLocalStorage(todoItems);
          sendFeedback("Item deleted", "red");
        } else {
          return;
        }
      });
    }
  });
};

//TODO: Get List
const getList = function (todoItems) {
  itemList.innerHTML = "";

  todoItems.forEach(function (item, index) {
    itemList.insertAdjacentHTML(
      "beforeend",
      `<div class="item flex justify-between my-3 border-b border-b-green-500 pb-1">
        <div class="flex gap-1 items-center">
          <h6 class="item-index border border-green-500 rounded p-1">${index}</h6>
          <p class="item-name capitalize">${item}</p>
        </div>
        <div class="item-icons">
          <i class="far fa-check-circle cursor-pointer complete-item mx-2 item-icon text-green-500"></i>
          <i class="far fa-edit cursor-pointer edit-item mx-2 item-icon"></i>
          <i class="far fa-times-circle cursor-pointer delete-item item-icon text-red-500"></i>
        </div>
      </div>`
    );
    handleItem(item);
  });
};

//TODO: Get Local Storage
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  if (todoStorage === "undefined" || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  }
};

//TODO: Set Local Storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

// get local storage from page
getLocalStorage();

//TODO: add an item to the List, including to local storage
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemName = itemInput.value;

  if (itemName.length === 0) {
    sendFeedback("Please Enter Valid Value", "red");
  } else {
    addBtn.innerHTML = "Add Item";
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
    sendFeedback("Item added to the list", "green");
  }

  itemInput.value = "";
});

//TODO: clear all items from the list
clearButton.addEventListener("click", function () {
  confirm("Are you sure you want to clear the list?")
    ? ((todoItems = []), localStorage.clear(), getList(todoItems))
    : null;
});

// TODO: Send feedback
function sendFeedback(text, className) {
  feedback.classList.add(
    "border",
    `bg-${className}-100`,
    `text-${className}-700`
  );
  feedback.innerHTML = text;
  setTimeout(function () {
    feedback.classList.remove(
      "border",
      `bg-${className}-100`,
      `text-${className}-700`
    );
    feedback.innerHTML = "Write value for item";
  }, 3000);
}
