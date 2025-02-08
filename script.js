document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    //Creating a function that will be responsible forn adding a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText == "") {
            alert("Enter a task");
        }
        else {
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
            };
            newList.appendChild(removeBtn);//Append the remove button to the 'li' element
            taskList.appendChild(newList);//Append the 'li' element to the taskList
            taskInput.value = '';//Clear the input field after adding a task
        };
    };
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