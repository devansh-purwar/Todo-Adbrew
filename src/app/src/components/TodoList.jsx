import React from 'react'
import Todo from './Todo'
export default function TodoList({ todos }) {
    return (
        <div>
            <h1>List of TODOs</h1>

            {todos.map(todo => (
                <Todo key={todo._id['$oid']} todo={todo} />
            ))}
        </div>
    )
}
