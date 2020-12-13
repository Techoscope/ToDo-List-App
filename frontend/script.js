// As a user, I can enter the a task name in the input and click button to add into the list.

document.getElementById('add_item').addEventListener('click', addItem);

async function addItem() {
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
      console.log(jsonResponse)
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error)
  }
}