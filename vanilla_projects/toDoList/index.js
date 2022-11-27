window.addEventListener("load", () => {
    loadedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.getElementById("name");
    const name = localStorage.getItem("name") || '';

    // Store to localstorage name 
    nameInput.value = name;
    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("name", e.target.value);      
    });

    const newListForm = document.getElementById("new-todo-form");
    
    // Store new todo task to localstorage
    newListForm.addEventListener("submit", (e) => {
        e.preventDefault();
        newTodo = {
            content : e.target.elements.content.value,
            category: e.target.elements.category.value,
            isFinished: false
        }

        loadedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(loadedTodos));

        e.target.reset();
        insertTodos();
    });

    insertTodos();
});

function insertTodos(){
    const toDoList = document.getElementById("todo-list");
    toDoList.innerHTML = '';
    
    for(let i = 0; i < loadedTodos.length; i++){
        
        // Create todo task and insert it to todo list 
        let toDoItem = document.createElement("div");
        toDoItem.classList.add("todo-item");

        if(loadedTodos[i].isFinished)
            toDoItem.classList.add("done");    
        
        toDoItem.innerHTML = `
        <label>
            <input type="checkbox">
            <span class="bubble ${loadedTodos[i].category}"></span>
        </label>
        <div class="todo-content">
            <input type="text" value="${loadedTodos[i].content}" readonly="">
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>`;
        toDoList.appendChild(toDoItem);

        const todo_items = document.querySelectorAll(".todo-item");
        let todo_item = todo_items[todo_items.length - 1];
        let edit = todo_item.querySelector(".edit");
        let del = todo_item.querySelector(".delete");
        let input = todo_item.querySelector(".todo-content input");
        let checkbox = todo_item.querySelector("label input")

        // Make edits in your todo 
        edit.addEventListener("click", (e)=>{
            input.removeAttribute("readonly");
            input.focus();

            input.addEventListener('blur', () => {
                loadedTodos[i].content = input.value;
                localStorage.setItem('todos', JSON.stringify(loadedTodos));
                insertTodos();
            })
        });
        // !Make edits in your todo 

        // Delete your todo task
        del.addEventListener("click", (e)=>{
            loadedTodos.splice(i,1);
            localStorage.setItem('todos', JSON.stringify(loadedTodos));
            insertTodos();
        });
        // !Delete your todo task

        // Strikethrough the task content if it is finished
        checkbox.addEventListener("click", (e)=>{
            loadedTodos[i].isFinished = e.target.checked;

            if(!e.target.checked){
                todo_item.classList.remove("done");
            }
            else{
                todo_item.classList.add("done");
            }

            localStorage.setItem("todos", JSON.stringify(loadedTodos));
        });
        // !Strikethrough the task content if it is finished
    }
}   