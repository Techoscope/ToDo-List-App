// add item event listener
document.getElementById('add_item').addEventListener('click', saveTodoItem)

// save todoitem to database
function saveTodoItem() {
  if(document.getElementById('input_box').value.trim()){
    const url = 'http://localhost:8080/api/todoitems/';
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
       title: document.getElementById('input_box').value
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
    async function postData() {
      try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
          const jsonResponse = await response.json();
          addToDoItems(jsonResponse);
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    postData();
    // Empty the input box after creating todo item
    document.getElementById('input_box').value = ""
  } else {
    alert('Please enter a value!')
  }
}

// add todo items in DOM
function addToDoItems(todoItem) {
  const listItem = document.createElement('li');
  listItem.id = todoItem.id; 
  listItem.className = 'list-item';
  listItem.innerHTML = `
    <input type="text" class="todo-item" value="${todoItem.title}" readonly="true">
    <span class="edit-item">(edit)</span>
    <span id="${todoItem.id}" class="remove-item">(remove)</span>
    <span class="update-item" hidden>(update)</span>
    <span class="cancel-item" hidden>(cancel)</span>

  `
  document.getElementById('ul_list').appendChild(listItem);
  // Strike through the item if completed
  if(todoItem.completed) {
    listItem.querySelector('.todo-item').style.textDecoration = 'line-through';
  }
  // Add event listener to remove item
  listItem.querySelector('.remove-item').addEventListener('click',removeItem)
  // Add event listener to complete item
  listItem.querySelector('.todo-item').addEventListener('click', completeItem)
  // Add event listener to edit item
  listItem.querySelector('.edit-item').addEventListener('click', editItem);
  listItem.querySelector('.update-item').addEventListener('click', updateItem)
}

// remove item from the DOM
function removeItem(e) {
  // document.getElementById('ul_list').removeChild(e.target.parentElement);
  const isConfirmed = confirm('Are you sure you want to delete the item: ' +  e.target.parentElement.querySelector('.todo-item').innerHTML);
  if(isConfirmed){
    deleteTodoItem(e.target);
  }
}

// remove todo item from the database
async function deleteTodoItem(removeButton) {
  const url = "http://localhost:8080/api/todoitems/" + removeButton.id;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  }
  try {
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      removeButton.parentElement.remove();
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

// complete item functiton
function completeItem(e) {
  if(e.target.style.textDecoration === 'line-through') {
    markAsComplete(e.target, false, 'none')
  } else {
    markAsComplete(e.target, true, 'line-through')
  }
}

// mark as complete item in the database
async function markAsComplete(target, value, style) {
  const url = "http://localhost:8080/api/todoitems/" + target.parentElement.id;
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      completed: value
     }),
    headers: {
      "Content-Type": "application/json",
    }
  }
  try {
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      target.style.textDecoration = style;
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

async function getTodoItems() {
  try {
    const response = await fetch('http://localhost:8080/api/todoitems/');
    if(response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      for(let i=0; i<jsonResponse.length; i++) {
        addToDoItems(jsonResponse[i])
      }
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

getTodoItems()

function editItem(e) {
  // console.log()
  e.target.parentElement.querySelector('.todo-item').readOnly = false;
  e.target.parentElement.querySelector('.todo-item').select();
  e.target.parentElement.querySelector('.remove-item').hidden = true;
  e.target.hidden = true;
  e.target.parentElement.querySelector('.cancel-item').hidden = false;
  e.target.parentElement.querySelector('.update-item').hidden = false;

}

async function updateItem(e) {
  const url = "http://localhost:8080/api/todoitems/" + e.target.parentElement.id;
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      title: e.target.parentElement.querySelector('.todo-item').value
     }),
    headers: {
      "Content-Type": "application/json",
    }
  }
  try {
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      e.target.parentElement.querySelector('.todo-item').readOnly = true;
      e.target.parentElement.querySelector('.remove-item').hidden = false;
      e.target.hidden = true;
      e.target.parentElement.querySelector('.cancel-item').hidden = true;
      e.target.parentElement.querySelector('.edit-item').hidden = false;
      const jsonResponse = await response.json();
      console.log(jsonResponse.message);
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

// postTodoItem function

// deleteTodoItem function

// completeTodoItem function