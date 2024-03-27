import React, { useEffect } from 'react';
import TodoList from './ToDo/TodoList';
import Context from './context';
import Loader from './Loader';
import Modal from './modal/Modal';

const AddTodo = React.lazy(() => { return import('./ToDo/addTodo')});

function App() {
    const [state, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    setList(json);
                    setLoading(false);
                }, 2000);

            })
    }, []);

    function toggleTodo(id) {
        setList(state.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        }));

        
    }

    function removeTodo(id) {
        setList(state.filter((item) => {
            return item.id !== id
        }));
    }

    function addTodo(title) {
        setList(state.concat([{
            title,
            id: Date.now(),
            completed: false
        }]));
    }

    return (
        <Context.Provider value={{ removeTodo }}>
            <div className='wrapper'>
                <h1> React tutorial </h1>
                <Modal></Modal>
                <React.Suspense fallback={<Loader></Loader>}>
                    <AddTodo onCreate={addTodo}></AddTodo>
                </React.Suspense>
                {loading && <Loader></Loader>}
                {state.length !== 0 ? (
                    <TodoList todos={state} onToggle={toggleTodo}></TodoList>
                ) : loading ? (
                    null
                ) : <p>No todos</p>}

            </div>
        </Context.Provider>
    );
}

export default App;
