import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { StateType } from "./components/model";
import TodoList from "./components/TodoList";
import { TodoReducer } from "./context/reducers";
import { ADD_TODO, TODO_DONE } from "./context/actionNames";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
	const [todo, setTodo] = useState("");
	const initialState: StateType = {
		todos: [],
		completedTodos: [],
	};
	const [state, dispatch] = useReducer(TodoReducer, initialState);
	console.log(state);
	const handleAdd = (e: React.FormEvent): void => {
		e.preventDefault();
		if (todo) {
			dispatch({ type: ADD_TODO, payload: todo });
			setTodo("");
		}
	};

	const onDragEnd = (result: DropResult) => {
		console.log(result);
		if (
			result.destination &&
			result.source.droppableId !== result.destination?.droppableId
		) {
			console.log("kotak");
			// dispatch({
			// 	type: TODO_DONE,
			// 	payload: { isDone: , id: Number(result.draggableId) },
			// });
		} else if (result.source.droppableId === result.destination?.droppableId) {
			if (result.source.index !== result.destination.index) {
				// dispatch()
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<h1 className="heading">TASKIFY</h1>
				<InputField
					todo={todo}
					setTodo={setTodo}
					handleAdd={handleAdd}
				></InputField>
				<TodoList allTodos={state} dispatch={dispatch} />
			</div>
		</DragDropContext>
	);
}

export default App;
