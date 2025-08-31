function dataForm(ageForm){
    console.log(ageForm);
    var formData = new FormData(ageForm);

    for(var pair of formData.entries()){
        console.log(pair[0]+ ': '+ pair[1]);

        let msg = "";
        const resultDiv = document.getElementById("ageResult");

        if (pair[1] < 0 || pair[1] == 0 || isNaN(pair[1])){
            msg = "Edad no valida";
        }else if (pair[1] < 18){
            msg = "Eres menor de edad";
        }else if (pair[1] >= 18 && pair[1] <= 65){
            msg = "Eres adulto";
        }else if (pair[1] > 65){
            msg = "Eres adulto mayor";
        }else{
            msg = "Estas en los limites de la vida";
        }

        resultDiv.innerHTML = msg;
    }

    console.log(Object.fromEntries(formData));
    console.log(JSON.stringify(Object.fromEntries(formData), null, 2));
}

document.addEventListener('DOMContentLoaded', function(){
    // Get the dom elements that we r going to use 
    const newTask = document.getElementById("newTask");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    // Stores tasks
    let tasks = [];
    let taskId = 0;
    // Add task to the list
    function addTask(){
        const taskText = newTask.value.trim();

        if (taskText === ''){
            alert("please enter a task")
            return;
        }
        const task = {
            id : taskId++,
            text : taskText,
            completed : false
        }
        tasks.push(task);
        newTask.value = '';

        renderTasks();
    }
    // Toggle task completion
    function toggleTaskCompletion(taskId){
        // create a copy of the tasks array
        tasks = tasks.map(task =>{
            // if the task id matches the one we want to toggle
            if (task.id === taskId){
                // toggle the completed status
                return {...task, completed: !task.completed};
            }
            // return the other tasks unchanged
            return task;
        })
    }

    function deleteTask(taskId){
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    // render tasks to dom
    function renderTasks(){
        // Clear the existing list
        taskList.innerHTML = '';
        if (tasks.length === 0){
            taskList.innerHTML = '<div class="empty-message"><p>No tasks added yet.</p></div>';
            return;
        }
        // Render each task
        tasks.forEach(task =>{
            const li = document.createElement('li');

            if(task.completed === true){
                li.classList.add('completed');
            }
            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;
            textSpan.className = 'span-task';

            // Create buttons div
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'buttons-div';
            // Create completed button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = task.completed ? 'Undo' : 'Complete';
            completedButton.className = 'completed-button';
            completedButton.addEventListener('click', ()=> toggleTaskCompletion(task.id));

            const deleteButton =document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            buttonsDiv.appendChild(completedButton);
            buttonsDiv.appendChild(deleteButton);

            li.appendChild(textSpan);
            li.appendChild(buttonsDiv);
            
            console.log(li);
            taskList.appendChild(li);
        })
    }
    // add task with button
    addButton.addEventListener('click',addTask);
    // add task with enter key
    newTask.addEventListener('keypress',function(e){
        if (e.key === 'Enter'){
            addTask();
        }
    });
    renderTasks();
});

//send age form
document.getElementById("ageForm").addEventListener("submit", function(e){
    console.log(e);
    e.preventDefault();
    dataForm(e.target);
});


