function dragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData("number", target.dataset.number!);
    event.dataTransfer?.setData("text", target.id);
    event.dataTransfer!.effectAllowed = "move";
    target.classList.add('dragging');
}

function dragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "move";
}

function dragEnter(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.classList.add('over');
}

function dragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove('over');
}

function dragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove('dragging');
}

function drop(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const number = event.dataTransfer?.getData("number");
    const data = event.dataTransfer?.getData("text");

    if (number && data) {
        const draggedElement = document.getElementById(data) as HTMLElement;
        if (parseInt(number) > parseInt(target.dataset.number!)) {
            target.before(draggedElement);
        } else {
            target.after(draggedElement);
        }
    }
    target.classList.remove('over');

    // Additional functions to handle any other operations
    numberingTodos();
    updateLocalStorage();
}

function numberingTodos() {
    // Implement your logic here
}

function updateLocalStorage() {
    // Implement your logic here
}

document.addEventListener('DOMContentLoaded', () => {
    const todos = document.querySelectorAll(".todo-list .todo");

    todos.forEach((todo) => {
        const todoElement = todo as HTMLElement;
        todoElement.setAttribute("draggable", "true");

        const childElements = todoElement.querySelectorAll("*");
        childElements.forEach((child) => {
            (child as HTMLElement).setAttribute("draggable", "false");
        });

        todoElement.addEventListener('dragstart', dragStart);
        todoElement.addEventListener('dragover', dragOver);
        todoElement.addEventListener('dragenter', dragEnter);
        todoElement.addEventListener('dragleave', dragLeave);
        todoElement.addEventListener('dragend', dragEnd);
        todoElement.addEventListener('drop', drop);
    });
});
