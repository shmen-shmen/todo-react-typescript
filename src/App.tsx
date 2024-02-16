import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { TodoReducer } from "./context/reducers";
import { ADD_TODO } from "./context/actionNames";

function App() {
	const [todo, setTodo] = useState("");
	const initialState: Todo[] = [];
	const [state, dispatch] = useReducer(TodoReducer, initialState);

	const handleAdd = (e: React.FormEvent): void => {
		e.preventDefault();
		if (todo) {
			dispatch({ type: ADD_TODO, payload: todo });
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
			<TodoList allTodos={state} dispatch={dispatch} />
		</div>
	);
}

export default App;
