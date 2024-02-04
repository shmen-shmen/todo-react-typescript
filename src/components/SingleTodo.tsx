import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
	todo: Todo;
	allTodos: Todo[];
	setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function SingleTodo({ todo, allTodos, setAllTodos }: Props) {
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
		const newTodos = allTodos.map((todo) => {
			if (todo.id === id) {
				todo.todo = editTodo;
			}
			return todo;
		});
		setAllTodos(newTodos);
		setEditing(false);
	};

	const handleDone = (id: number): void => {
		const newTodos = allTodos.map((todo) => {
			if (todo.id === id) {
				todo.isDone = !todo.isDone;
			}
			return todo;
		});
		setAllTodos(newTodos);
	};

	const handleDelete = (id: number): void => {
		const newTodos = allTodos.filter((todo) => todo.id !== id);
		setAllTodos(newTodos);
	};

	return (
		<form
			action=""
			className="todos__single"
			onSubmit={(e) => {
				handleTodoEdit(e, todo.id);
			}}
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
			) : todo.isDone ? (
				<s className="todos__single--text">{todo.todo}</s>
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
	);
}

export default SingleTodo;
