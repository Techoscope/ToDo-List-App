
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
  // Create the <li> element on the fly
  const listItem = document.createElement('li');
  // Alter the HTML content of the created <li> tag above
  listItem.innerHTML = `
    <span class="click task-item">${document.getElementById('input_box').value}</span>
    <span class="click blue">(Edit)</span>
    <span class="click" style="color: red">(Remove)</span>
  `
  // Add evenet listeners to the newly create items in <li> element
  listItem.querySelectorAll('.task-item')[0].addEventListener('click', completeItem);
  // Append the created <li> element into <ul> element in HTML
  document.getElementById('ul_list').appendChild(listItem);
  // Empty the add item's input value
  document.getElementById('input_box').value = "";
}

const completeItem = function (e) {
  console.log(e.target);
  // if(e.target.style.textDecoration === 'line-through') {
  //   e.target.style.textDecoration = 'none'
  // } else {
  //   e.target.style.textDecoration  = 'line-through';
  // }
}

const removeItem = function (e) {
  // document.getElementById('ul_list').removeChild(e.target.parentElement);
  console.log(e.target.parentElement)
}

// document.getElementById('item').addEventListener('click', completeItem);

for (i of document.querySelectorAll('.task-item')) {
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