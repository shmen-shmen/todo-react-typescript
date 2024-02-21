import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { StateType } from "./components/model";
import TodoList from "./components/TodoList";
import { TodoReducer } from "./context/reducers";
import { ADD_TODO, TODO_REARRANGE } from "./context/actionNames";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

function App() {
	const [todo, setTodo] = useState("");
	const initialState: StateType = {
		todos: [],
		completedTodos: [],
	};
	const [state, dispatch] = useReducer(TodoReducer, initialState);
	const handleAdd = (e: React.FormEvent): void => {
		e.preventDefault();
		if (todo) {
			dispatch({ type: ADD_TODO, payload: todo });
			setTodo("");
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) {
			return;
		} else if (
			source.droppableId === destination?.droppableId &&
			source.index === destination.index
		) {
			return;
		}
		dispatch({
			type: TODO_REARRANGE,
			payload: {
				fromGroup: source.droppableId,
				toGroup: destination.droppableId,
				fromIndex: source.index,
				toIndex: destination.index,
			},
		});
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
