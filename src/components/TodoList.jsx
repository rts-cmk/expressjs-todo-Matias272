export default function TodoList() {
  return (
    <div class="container">
      <h2>To-do list</h2>
      <div class="todo-top">
        <input type="text" id="taskInput" placeholder="Add a task" />
        <button id="addTask">Add</button>
      </div>

      <ul id="taskList"></ul>
    </div>
  );
}
