const taskList = document.getElementById('ft_list');
        const newTaskButton = document.getElementById('newTaskButton');
        window.onload = function() {
            loadTasks();
        }
        newTaskButton.addEventListener('click', function() {
            const taskContent = prompt("Enter a new task:");
            if (taskContent && taskContent.trim() !== "") {
                addTask(taskContent);
                saveTasks();
            }
        });
        function addTask(taskContent) {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = taskContent;
            taskDiv.addEventListener('click', function() {
                const confirmation = confirm("Do you want to remove this task?");
                if (confirmation) {
                    taskDiv.remove();
                    saveTasks();
                }
            });
            taskList.prepend(taskDiv);
        }
        function saveTasks() {
            const tasks = [];
            document.querySelectorAll('.task').forEach(task => {
                tasks.push(task.textContent);
            });
            document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))};path=/;max-age=31536000`; 
        }
        function loadTasks() {
            const cookies = document.cookie.split(';');
            const taskCookie = cookies.find(cookie => cookie.trim().startsWith('tasks='));    
            if (taskCookie) {
                const taskString = decodeURIComponent(taskCookie.split('=')[1]);
                try {
                    const tasks = JSON.parse(taskString);
                    tasks.forEach(taskContent => {
                        addTask(taskContent); 
                    });
                } catch (e) {
                    console.error("Error parsing task data from cookies", e);
                }
            }
        }
