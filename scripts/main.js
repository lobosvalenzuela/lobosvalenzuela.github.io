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



});
//age form
document.getElementById("ageForm").addEventListener("submit", function(e){
    console.log(e);
    e.preventDefault();
    dataForm(e.target);
});
