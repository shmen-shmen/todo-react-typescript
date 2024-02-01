import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";

function App() {
	const [todo, setTodo] = useState("");
	const [allTodos, setAllTodos] = useState([] as Todo[]);

	const handleAdd = (e: React.FormEvent): void => {
		e.preventDefault();
		const newTodo: Todo = {
			id: Date.now(),
			todo,
			isDone: false,
		};

		if (todo) {
			setAllTodos([...allTodos, newTodo]);
			setTodo("");
		}
	};

	return (
		<div className="App">
			<h1 className="heading">TASKIFY</h1>
			<InputField
				todo={todo}
				setTodo={setTodo}
				handleAdd={handleAdd}
			></InputField>
			<TodoList allTodos={allTodos} />
		</div>
	);
}

export default App;
