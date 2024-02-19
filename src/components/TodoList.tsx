import React from "react";
import { StateType } from "./model";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { Actions } from "../context/reducers";
import { Droppable } from "react-beautiful-dnd";

interface Props {
	allTodos: StateType;
	dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ allTodos, dispatch }: Props) => {
	return (
		<div className="container">
			<Droppable droppableId="todosList">
				{(provided) => {
					return (
						<div
							className="todos"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className="todos__heading">Active Tasks</span>
							{allTodos.todos.map((item, index) => {
								return (
									<SingleTodo
										todo={item}
										key={item.id}
										dispatch={dispatch}
										index={index}
									/>
								);
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
			<Droppable droppableId="todosRemove">
				{(provided) => {
					return (
						<div
							className="todos remove"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							<span className="todos__heading">Active Tasks</span>
							{allTodos.completedTodos.map((item, index) => {
								return (
									<SingleTodo
										todo={item}
										key={item.id}
										dispatch={dispatch}
										index={index}
									/>
								);
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
};

export default TodoList;
