
// document.querySelector('#add_item').onclick = function () {
  
//   // Grab the todo item value
//   let inputBox = document.querySelector('#input_box');
  
//   // Chck if its not empty
  
//   if(inputBox.value){
    
//     // Create a li item for ul element (<li></li>)
//     let listItem = document.createElement('li');
    
//     // Add todo item value in between li tags (<li>asjkdfhakh</li>)
//     listItem.innerHTML = inputBox.value;
    
//     // Add created li item to the ul element
//     document.querySelector('#ul_list').appendChild(listItem);
    
//     // Empty the input box after creating list item
//     inputBox.value = "";
//   }
  
// }

const addItem = function (e) {
  // console.log(e)
  const listItem = document.createElement('li');
  listItem.innerHTML = document.getElementById('input_box').value + ' - <span style="color:red">(remove)</span>';
  listItem.className = 'item';
  listItem.addEventListener('click', completeItem);
  listItem.firstElementChild.addEventListener('click', removeItem);
  document.getElementById('ul_list').appendChild(listItem);
  // Clear the input box after creating an item
  document.getElementById('input_box').value = "";
}

const completeItem = function (e) {
  if(e.target.localName === 'li') {
    e.target.innerHTML = '<del>' + e.target.innerHTML + '</del>';

  } else {
    e.target.parentElement.innerHTML = e.target.innerHTML;
    
  }
}

const removeItem = function (e) {
  document.getElementById('ul_list').removeChild(e.target.parentElement);
}

// document.getElementById('item').addEventListener('click', completeItem);

for (i of document.querySelectorAll('.item')) {
  i.addEventListener('click', completeItem)
}

for (i of document.querySelectorAll('.remove_item')) {
  i.addEventListener('click', removeItem)
}


document.getElementById('add_item').addEventListener('click', addItem);
// document.getElementById('add_item').removeEventListener('click', clickButton);

/*
  Event Listeners
  Event Triggers
  Event Handlers
*/