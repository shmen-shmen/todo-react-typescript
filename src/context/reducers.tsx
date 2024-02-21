/* eslint-disable no-mixed-spaces-and-tabs */
import { Todo, StateType } from "../components/model";
import {
	ADD_TODO,
	REMOVE_TODO,
	EDIT_TODO,
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
	| {
			type: typeof TODO_REARRANGE;
			payload: {
				toGroup: string;
				fromGroup: string;
				fromIndex: number;
				toIndex: number;
			};
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
		case TODO_REARRANGE: {
			const { toGroup, fromGroup, toIndex, fromIndex } = action.payload;
			const todosCopy = [...state.todos];
			const completedTodosCopy = [...state.completedTodos];
			let todo: Todo;

			if (fromGroup === "todos") {
				todo = todosCopy.splice(fromIndex, 1)[0];
			} else {
				todo = completedTodosCopy.splice(fromIndex, 1)[0];
			}
			if (toGroup === "todos") {
				todosCopy.splice(toIndex, 0, todo);
			} else {
				completedTodosCopy.splice(toIndex, 0, todo);
			}

			return { todos: todosCopy, completedTodos: completedTodosCopy };
		}
		default:
			return state;
	}
};
