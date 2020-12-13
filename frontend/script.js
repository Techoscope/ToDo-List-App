// As a user, I can enter the a task name in the input and CLICK button to add into the list.
// As a user, I can hit ENTER to add a todo item.
// As an app, I can clear the input box value after adding todo item.
// Asa a user, I can see the list of all todo items when I open the app.
// As a user, I can see a warning when I leave the inputbox empty

getTodoItemsFromDatabase();
document.getElementById('add_item').addEventListener('click', saveItemToDatabase);
document.getElementById('input_box').addEventListener('keypress', saveItemToDatabase);


async function saveItemToDatabase(e) {
  if((e.key === 'Enter' || e.type === 'click') && document.getElementById('input_box').value.trim() !== '') {
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
  listItem.className = 'list-item';
  listItem.innerHTML = `
    <span class="todo-item">${todoObject.title}</span>
    <span class="edit-item">(edit)</span>
    <span class="remove-item">(remove)</span>
  `
  document.getElementById('ul_list').appendChild(listItem);
  // Clear the input box value
  document.getElementById('input_box').value = '';
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