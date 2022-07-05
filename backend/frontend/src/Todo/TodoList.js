import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { useLocation } from 'react-router-dom';

function TodoList() {
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:4040/task', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        type: data1.replace(' ', ''),
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem('token'),
                    },
                });
                const { data } = await response.json();
                console.log(data);
                data.map((x) => {
                    addTodo({
                        id: Math.floor(Math.random() * 10000),
                        text: x,
                    });
                });
            } catch (error) {
                throw error;
            }
        })();
    }, []);
    const location = useLocation();
    const data1 = location.state;
    console.log(data1);

    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        console.log('addtodo');
        console.log(todo);
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = (id) => {
        const removedArr = [...todos].filter((todo) => todo.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };
    const SubmitHandler = () => {
        (async () => {
            try {
                const response = await fetch('http://localhost:4040/task/create', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        type: data1.replace(' ', ''),
                        task: todos[0].text,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem('token'),
                    },
                });
                const { message } = await response.json();
                alert(message);
            } catch (error) {
                throw error;
            }
        })();
    };
    return (
        <div className='todolist'>
            <h1>{data1}</h1> <br />
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
            <button onClick={SubmitHandler} className='saveButton'>
                {' '}
                Save{' '}
            </button>
        </div>
    );
}

export default TodoList;
