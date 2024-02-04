import React from "react";
import { Todo } from "./model";
import "./styles.css";
import SingleTodo from "./SingleTodo";

interface Props {
	allTodos: Todo[];
	setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ allTodos, setAllTodos }: Props) => {
	return (
		<div className="todos">
			{allTodos.map((item: Todo) => (
				<SingleTodo
					todo={item}
					key={item.id}
					allTodos={allTodos}
					setAllTodos={setAllTodos}
				/>
			))}
		</div>
	);
};

export default TodoList;
