import React from "react";
import { Todo } from "./model";
import "./styles.css";

interface Props {
	allTodos: Todo[];
}

function TodoList({ allTodos }: Props) {
	return (
		<div className="todos">
			{allTodos.map((item: Todo) => (
				<div key={item.id}>{item.todo}</div>
			))}
		</div>
	);
}

export default TodoList;
