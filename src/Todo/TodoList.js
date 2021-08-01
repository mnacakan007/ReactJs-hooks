import React from "react";
import TodoItem from "./TodoItem";
import PropType from "prop-types"

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

function TodoList(props) {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => {
        return <TodoItem
          todo={todo}
          key={todo.id}
          index={index}
          onChange={props.onToggle}
        />
      })}
    </ul>
  );
}

TodoList.prototype = {
  todos: PropType.arrayOf(PropType.object).isRequired,
  onChange: PropType.func.isRequired
}

export default TodoList
