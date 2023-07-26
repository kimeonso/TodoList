import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css'

export default function TodoList({filter}) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

    const handleAdd = (todo) => setTodos([...todos, todo]) 
    // 인자로 todo를 받고 투두를 배열 뒤에 추가 

    const handleUpdate = (updated) => 
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    
    const handleDelete = (deleted) =>
    setTodos(todos.filter((t)=>t.id !== deleted.id));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const filtered = gerFilteredItems(todos, filter);

    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item) => (
                <Todo 
                key={item.id} 
                todo={item} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete}/>
                ))}
            </ul>            
            <AddTodo onAdd={handleAdd} />
        </section>
    );
}

function readTodosFromLocalStorage() {
    console.log('read')
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function gerFilteredItems(todos, filter) {
    if(filter === 'all') {
        return todos;
    }
    return todos.filter(todo => todo.status === filter);
}

