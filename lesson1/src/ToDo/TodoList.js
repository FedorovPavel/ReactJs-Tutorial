import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

//  first approach
const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
};

function TodoList(props) {

    console.log(props.todos);
    return (
        <ul style={styles.ul}>
            {props.todos.map((item, index) => {
              return <TodoItem key={item.id} settings={item} index={index + 1} onChange={props.onToggle}></TodoItem>
            })}
        </ul>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired
};

export default TodoList