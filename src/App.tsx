import { useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { StateType } from "./components/model";
import TodoList from "./components/TodoList";
import { TodoReducer } from "./context/reducers";
import { ADD_TODO, TODO_DONE, TODO_REARRANGE } from "./context/actionNames";
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
		if (
			result.destination &&
			result.source.droppableId !== result.destination?.droppableId
		) {
			dispatch({
				type: TODO_DONE,
				payload: {
					isDone: result.source.droppableId !== "todosList",
					id: Number(result.draggableId),
				},
			});
		} else if (result.source.droppableId === result.destination?.droppableId) {
			if (result.source.index !== result.destination.index) {
				dispatch({
					type: TODO_REARRANGE,
					payload: {
						dragSource: result.source.droppableId,
						to: result.destination.index,
						from: result.source.index,
					},
				});
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
