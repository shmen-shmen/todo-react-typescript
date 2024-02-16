import React from "react";
import { Todo } from "./model";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Actions } from "../context/reducers";

interface Props {
	allTodos: Todo[];
	dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ allTodos, dispatch }: Props) => {
	return (
		<div className="todos">
			{allTodos.map((item: Todo) => (
				<SingleTodo todo={item} key={item.id} dispatch={dispatch} />
			))}
		</div>
	);
};

export default TodoList;
