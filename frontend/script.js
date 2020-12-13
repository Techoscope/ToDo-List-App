// As a user, I can enter the a task name in the input and CLICK button to add into the list.
// As a user, I can hit ENTER to add a todo item.
// As an app, I can clear the input box value after adding todo item.
// Asa a user, I can see the list of all todo items when I open the app.
// As a user, I can see a warning when I leave the inputbox empty
// As a user, I can delete and remove a todo Item when click remove button
// As a user, I can click checkbox to complete todo task

getTodoItemsFromDatabase();
document.getElementById('add_item').addEventListener('click', saveItemToDatabase);
document.getElementById('input_box').addEventListener('keypress', saveItemToDatabase);


async function saveItemToDatabase(e) {
  if((e.key === 'Enter' || e.type === 'click') && document.getElementById('input_box').value.trim()) {
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

function addItemToDOM(todoObject) {
  const listItem = document.createElement('li');
  listItem.id = todoObject.id;
  listItem.className = 'list-item';
  listItem.innerHTML = `
    <input class="complete-item" type="checkbox">
    <span class="todo-item">${todoObject.title}</span>
    <span class="edit-item">(edit)</span>
    <span class="remove-item">(remove)</span>
  `
  document.getElementById('ul_list').appendChild(listItem);
  // Clear the input box value
  document.getElementById('input_box').value = '';
  // Add remove event listener
  listItem.querySelector('.remove-item').addEventListener('click', removeItemFromDatabase);
  // Add complete event listener
  listItem.querySelector('.complete-item').addEventListener('click', completeItem);
  // Check chcekbox if task is competed
  if(todoObject.completed){
    listItem.querySelector('.complete-item').checked = true;
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
      alert(jsonResponse.message);
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
      completed: true
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
      // alert(jsonResponse.message);
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error)
  }
}