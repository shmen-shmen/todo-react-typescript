import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Actions } from "../context/reducers";
import { REMOVE_TODO, EDIT_TODO, TODO_DONE } from "../context/actionNames";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
	todo: Todo;
	index: number;
	dispatch: React.Dispatch<Actions>;
}

function SingleTodo({ todo, dispatch, index }: Props) {
	const [editing, setEditing] = useState(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);

	const handleTodoEdit = (
		e: React.FormEvent<HTMLFormElement>,
		id: number
	): void => {
		e.preventDefault();
		dispatch({
			type: EDIT_TODO,
			payload: { id: id, todo: editTodo, group: "todos" },
		});
		setEditing(false);
	};

	const handleDone = (id: number): void => {
		dispatch({ type: TODO_DONE, payload: { isDone: todo.isDone, id: id } });
	};

	const handleDelete = (id: number): void => {
		dispatch({ type: REMOVE_TODO, payload: { group: "todos", id: id } });
	};

	return (
		<Draggable draggableId={todo.id.toString()} index={index}>
			{(provided) => (
				<form
					action=""
					className="todos__single"
					onSubmit={(e) => {
						handleTodoEdit(e, todo.id);
					}}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{editing ? (
						<input
							type="text"
							value={editTodo}
							onChange={(e) => {
								setEditTodo(e.target.value);
							}}
							className="todos__single--test"
							ref={inputRef}
						/>
					) : (
						<span className="todos__single--text">{todo.todo}</span>
					)}
					<div>
						<span
							className="icon"
							onClick={() => {
								if (!todo.isDone) {
									setEditing(!editing);
								}
							}}
						>
							<AiFillEdit />
						</span>
						<span className="icon" onClick={() => handleDelete(todo.id)}>
							<AiFillDelete />
						</span>
						<span className="icon" onClick={() => handleDone(todo.id)}>
							<MdDone />
						</span>
					</div>
				</form>
			)}
		</Draggable>
	);
}

export default SingleTodo;
