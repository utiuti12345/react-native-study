export function getCompletedTodos(todos:Model) {
    return todos.filter(todo => todo.isCompleted);
}

export function getNumofTodos(todos:Model) {
    return getCompletedAll(todos).length;
}
