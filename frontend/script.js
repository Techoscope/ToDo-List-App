// As a user, I can enter the a task name in the input and CLICK button to add into the list.
// As a user, I can hit ENTER to add a todo item.
// As an app, I can clear the input box value after adding todo item.
// Asa a user, I can see the list of all todo items when I open the app.
// As a user, I can see a warning when I leave the inputbox empty
// As a user, I can delete and remove a todo Item when click remove button
// As a user, I can click on the checkbox for an incompleted task to complete
// As a user, I can click on the checkbox for a completed task to incomplete
// As a user, I can click on the edit button to update a todo task

getTodoItemsFromDatabase();
document.getElementById('add_item').addEventListener('click', saveItemToDatabase);
document.getElementById('input_box').addEventListener('keypress', saveItemToDatabase);


async function saveItemToDatabase(e) {
  if(e.key === 'Enter' || e.type === 'click') {
    if(document.getElementById('input_box').value.trim()) {
      const url = 'http://127.0.0.1:8080/api/todoitems/';

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          title: document.getElementById('input_box').value
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }

      try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
          const jsonResponse = await response.json();
          // Write what do you want to do with the response
          addItemToDOM(jsonResponse);
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Input Box cannot be empty')
    }
  }
}

function addItemToDOM(todoObject) {
  const listItem = document.createElement('li');
  listItem.id = todoObject.id;
  listItem.className = 'list-item';
  listItem.innerHTML = `
    <input class="complete-item" type="checkbox">
    <span class="todo-item-text edit-action-group">${todoObject.title}</span>
    <input type="text" class="todo-item-input update-action-group" value="${todoObject.title}" hidden>
    <span class="edit-item edit-action-group">(edit)</span>
    <span class="remove-item edit-action-group">(remove)</span>
    <span class="update-item update-action-group" hidden>(save)</span>
    <span class="cancel-item update-action-group" hidden>(cancel)</span>
  `
  document.getElementById('ul_list').appendChild(listItem);
  
  // Clear the input box value
  document.getElementById('input_box').value = '';
  
  // Add event listeners
  listItem.querySelector('.remove-item').addEventListener('click', removeItemFromDatabase);
  listItem.querySelector('.complete-item').addEventListener('click', completeItem);
  listItem.querySelector('.edit-item').addEventListener('click', editItem);
  listItem.querySelector('.cancel-item').addEventListener('click', cancelUpdate);
  listItem.querySelector('.update-item').addEventListener('click', updateChanges);
  listItem.querySelector('.todo-item-input').addEventListener('keypress', updateChanges);

  // Check chcekbox if task is competed
  if(todoObject.completed){
    listItem.querySelector('.complete-item').checked = true;
    listItem.querySelector('.todo-item-text').style.textDecoration = 'line-through';
    listItem.querySelector('.todo-item-text').style.fontStyle = 'italic';

  }
}

async function getTodoItemsFromDatabase() {
  const url = 'http://127.0.0.1:8080/api/todoitems/';

  try {
    const response = await fetch(url);
    if(response.ok) {
      const jsonResponse = await response.json();
      // Write what do you want to do with the response
      console.log(jsonResponse);
      for(let i = 0; i < jsonResponse.length; i++){
        addItemToDOM(jsonResponse[i]);
      }
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

async function removeItemFromDatabase(e) {
  const url = `http://127.0.0.1:8080/api/todoitems/${e.target.parentElement.id}`;

  const requestOptions = {
    method: 'DELETE',
  }

  try {
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      const jsonResponse = await response.json();
      // alert(jsonResponse.message);
      // Write what do you want to do with the response
      e.target.parentElement.remove();
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

async function completeItem(e) {
  const url = `http://127.0.0.1:8080/api/todoitems/${e.target.parentElement.id}`;

  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({
      completed: e.target.checked
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }

  try {
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      const jsonResponse = await response.json();
      // Write what do you want to do with the response
      if(e.target.checked) {
        e.target.parentElement.querySelector('.todo-item-text').style.textDecoration = 'line-through'
        e.target.parentElement.querySelector('.todo-item-text').style.fontStyle = 'italic';

      } else {
        e.target.parentElement.querySelector('.todo-item-text').style.textDecoration = 'none';
        e.target.parentElement.querySelector('.todo-item-text').style.fontStyle = 'normal';
      }
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}

function editItem(e) {
  // Select .edit-action-group in selected list item (e.target.parentElement)
  const editGroup = e.target.parentElement.querySelectorAll('.edit-action-group');
  for(let i = 0; i < editGroup.length; i++) {
    editGroup[i].hidden = true;
  }
  // Select .update-action-group in selected list item (e.target.parentElement)
  const updateGroup = e.target.parentElement.querySelectorAll('.update-action-group');
  for(let i = 0; i < updateGroup.length; i++) {
    updateGroup[i].hidden = false;
  }
}

function toggleUpdateGroup(e) {
  // Select .edit-action-group in selected list item (e.target.parentElement)
  const editGroup = e.target.parentElement.querySelectorAll('.edit-action-group');
  for(let i = 0; i < editGroup.length; i++) {
    editGroup[i].hidden = false;
  }
  // Select .update-action-group in selected list item (e.target.parentElement)
  const updateGroup = e.target.parentElement.querySelectorAll('.update-action-group');
  for(let i = 0; i < updateGroup.length; i++) {
    updateGroup[i].hidden = true;
  }
}

function cancelUpdate(e) {
  toggleUpdateGroup(e);

  const todoText = e.target.parentElement.querySelector('.todo-item-text').innerText;
  const todoInput = e.target.parentElement.querySelector('.todo-item-input');
  todoInput.value = todoText;
}

async function updateChanges(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    if(e.target.parentElement.querySelector('.todo-item-input').value.trim()) {
      const url = 'http://127.0.0.1:8080/api/todoitems/' + e.target.parentElement.id;

      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          title: e.target.parentElement.querySelector('.todo-item-input').value
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }

      try {
        const response = await fetch(url, requestOptions);
        if(response.ok) {
          const jsonResponse = await response.json();
          // Write what do you want to do with the response
          toggleUpdateGroup(e);
          const todoText = e.target.parentElement.querySelector('.todo-item-text');
          const todoInputVal = e.target.parentElement.querySelector('.todo-item-input').value;
          todoText.innerText = todoInputVal;
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Input Box cannot be empty')
    }
  }
}