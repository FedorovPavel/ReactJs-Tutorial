import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from './../context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #b0b0b0',
        borderRadius: '4px',
        marginBottom: '.5rem',
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem({settings, index, onChange}) {
    let classes = [];

    const {removeTodo} = useContext(Context);

    if (settings.completed) {
        classes.push('done');
    }

    return (
        <li style={styles.li}>
            <span className={classes.join(' ')}>
                <input type='checkbox' style={styles.input} onChange={() => {onChange(settings.id);}} checked={settings.completed}/>
                <strong>
                    {index}. 
                </strong>
                &nbsp;
                {settings.title}
            </span>
            <button className='rm-btn' onClick={removeTodo.bind(null, settings.id)}>
                &times;
            </button>
        </li>
    );
}

TodoItem.propTypes = {
    settings: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;