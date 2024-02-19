export interface Todo {
	id: number;
	todo: string;
	isDone: boolean;
}

export type StateType = { todos: Todo[]; completedTodos: Todo[] };
