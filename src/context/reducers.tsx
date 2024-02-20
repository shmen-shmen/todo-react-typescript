import { Todo, StateType } from "../components/model";
import {
	ADD_TODO,
	REMOVE_TODO,
	EDIT_TODO,
	TODO_DONE,
	TODO_REARRANGE,
} from "./actionNames";

export type Actions =
	| { type: typeof ADD_TODO; payload: string }
	| {
			type: typeof REMOVE_TODO;
			payload: { id: number; group: keyof StateType };
	  }
	| {
			type: typeof EDIT_TODO;
			payload: { id: number; todo: string; group: keyof StateType };
	  }
	| { type: typeof TODO_DONE; payload: { id: number; isDone: boolean } }
	| {
			type: typeof TODO_REARRANGE;
			payload: { dragSource: string; to: number; from: number };
	  };

export const TodoReducer = (state: StateType, action: Actions): StateType => {
	switch (action.type) {
		case ADD_TODO: {
			const newTodo: Todo = {
				id: Date.now(),
				todo: action.payload,
				isDone: false,
			};
			return { ...state, todos: [...state.todos, newTodo] };
		}
		case REMOVE_TODO: {
			const group = action.payload.group;
			const filteredArr = state[group].filter(
				(todo) => todo.id !== action.payload.id
			);
			return { ...state, [group]: filteredArr };
		}
		case EDIT_TODO: {
			const group = action.payload.group;
			return {
				...state,
				[group]: state[group].map((todo) => {
					if (todo.id === action.payload.id) {
						todo.todo = action.payload.todo;
					}
					return todo;
				}),
			};
		}
		case TODO_DONE: {
			const isDone = action.payload.isDone;
			const id = action.payload.id;

			let newTodos = state["todos"];
			let newCompletedTodos = state["completedTodos"];

			if (isDone) {
				newTodos.push(
					state["completedTodos"].filter((item) => item.id === id)[0]
				);
				newTodos = newTodos.map((item) =>
					item.id === id ? { ...item, isDone: !item.isDone } : item
				);
				newCompletedTodos = newCompletedTodos.filter((item) => item.id !== id);
			} else if (!isDone) {
				newCompletedTodos.push(
					state["todos"].filter((item) => item.id === id)[0]
				);
				newCompletedTodos = newCompletedTodos.map((item) =>
					item.id === id ? { ...item, isDone: !item.isDone } : item
				);
				newTodos = newTodos.filter((item) => item.id !== id);
			}
			return { todos: newTodos, completedTodos: newCompletedTodos };
		}
		case TODO_REARRANGE: {
			const { to, from, dragSource } = action.payload;
			const group = dragSource === "todosList" ? "todos" : "completedTodos";
			const arrToModify = state[group];
			const element = arrToModify.splice(from, 1)[0];
			arrToModify.splice(to, 0, element);
			return { ...state, [group]: arrToModify };
		}
		default:
			return state;
	}
};
