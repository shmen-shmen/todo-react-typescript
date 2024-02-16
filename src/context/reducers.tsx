import { Todo } from "../components/model";
import { ADD_TODO, REMOVE_TODO, EDIT_TODO, TODO_DONE } from "./actionNames";

export type Actions =
	| { type: typeof ADD_TODO; payload: string }
	| { type: typeof REMOVE_TODO; payload: number }
	| { type: typeof EDIT_TODO; payload: { id: number; todo: string } }
	| { type: typeof TODO_DONE; payload: number };

export const TodoReducer = (state: Todo[], action: Actions): Todo[] => {
	switch (action.type) {
		case ADD_TODO: {
			const newTodo: Todo = {
				id: Date.now(),
				todo: action.payload,
				isDone: false,
			};
			return [...state, newTodo];
		}
		case REMOVE_TODO: {
			return state.filter((todo) => todo.id !== action.payload);
		}
		case EDIT_TODO: {
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					todo.todo = action.payload.todo;
				}
				return todo;
			});
		}
		case TODO_DONE: {
			return state.map((todo) =>
				todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
			);
		}

		default:
			return state;
	}
};
