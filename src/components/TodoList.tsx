import React from "react";
import { Todo } from "./model";

interface Props {
	allTodos: Todo[];
}

function TodoList({ allTodos }: Props) {
	return (
		<div>
			{allTodos.map((item: Todo) => (
				<div key={item.id}>{item.todo}</div>
			))}
		</div>
	);
}

export default TodoList;
