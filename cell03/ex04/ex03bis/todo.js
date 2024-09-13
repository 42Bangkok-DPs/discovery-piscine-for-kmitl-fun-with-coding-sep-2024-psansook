$(document).ready(function() {
    const $ftList = $('#ft_list');
    const $newBtn = $('#new-btn');
    loadTodos();
    $newBtn.on('click', function() {
        const todoText = prompt('Enter your TO DO:');
        if (todoText && todoText.trim() !== '') {
            addTodo(todoText.trim());
        }
    });
    function addTodo(text) {
        const $div = $('<div class="todo"></div>');
        const $todoText = $('<span></span>').text(text);
        const $removeButton = $('<button class="removeBTN">x</button>');

        $removeButton.on('click', function(event) {
            event.stopPropagation();
            if (confirm('Do you want to remove this to-do?')) {
                $div.remove();
                saveTodos();
            }
        });
        $div.append($todoText, $removeButton);
        $ftList.prepend($div);
        saveTodos();
    }
    function saveTodos() {
        const todos = $ftList.children('.todo').map(function() {
            return $(this).find('span').text();
        }).get();
        document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
    }
    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todosCookie = cookies.find(cookie => cookie.startsWith('todos='));
        if (todosCookie) {
            const todos = JSON.parse(decodeURIComponent(todosCookie.split('=')[1]));
            todos.forEach(todo => addTodo(todo));
        }
    }
});
