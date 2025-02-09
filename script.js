document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //Implementing a local storage process.

    //1-Checking local storage for an existing list of task, if empty, allocate an empty array.
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    //Creating a function that will be responsible forn adding a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText == "") {
            alert("Enter a task");
        }
        else {
            //2- Saving task to local storage when new task is added
            storedTasks.push(taskText); //updating tasks array.
            localStorage.setItem('tasks', JSON.stringify(storedTasks));//saving updated array back to Local Storage.

            //Creating a 'li' element where task will be appended
            const newList = document.createElement('li');
            newList.textContent = taskText;

            //Creating a button element to discard task from a list
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');//Creating a class attribute for the button element.

            //Appling a click event to the remove button so that when triggered, removes the 'li' element from taskList
            removeBtn.onclick = () => {
                taskList.removeChild(newList);//Removing task from the DOM
                taskRemove(taskText);//Removing task from the local storage
            };
            newList.appendChild(removeBtn);//Append the remove button to the 'li' element
            taskList.appendChild(newList);//Append the 'li' element to the taskList
            taskInput.value = '';//Clear the input field after adding a task
        };
    };

    //3-Function to remove task when the Remove button is triggered and upadates local storage with new array
    function taskRemove(taskId) {
        if(storedTasks) {
            let newStoredTask = storedTasks.filter(i => {return i != taskId});//Returns all tasks except the specified taskId, which has been deleted.
            localStorage.setItem('tasks', JSON.stringify(newStoredTask));
        }
    };

    //4-Function that load page from local storage when page loads
    function loadTasks() {
        storedTasks.forEach(taskText => {
            //Creating a 'li' element where task will be appended
            const newList = document.createElement('li');
            newList.textContent = taskText;

            //Creating a button element to discard task from a list
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');//Creating a class attribute for the button element.

            //Appling a click event to the remove button so that when triggered, removes the 'li' element from taskList
            removeBtn.onclick = () => {
                taskList.removeChild(newList);
                taskRemove(taskText);
            };
            newList.appendChild(removeBtn);//Append the remove button to the 'li' element
            taskList.appendChild(newList);//Append the 'li' element to the taskList
            taskInput.value = '';//Clear the input field after adding a task
        });
    };

    //Invoking the function inorder for it ti load existiing task when the page is loaded or re-opened
    loadTasks();

    //Eventlistener to allow task to be added using by clicking
    addButton.addEventListener('click', function () {
        addTask();
    })
    //Eventlistener to allow task to be added using the 'enter' Key
    taskInput.addEventListener('keypress', function (event) {
        if(event.key === 'Enter') {
            addTask();
        }
    })
});