import {useTodoList} from '../model/use-todo-list.jsx'
import {useCreateTodo} from '../model/use-create-todo.js'
import {useDeleteTodo} from '../model/use-delete-todo.js'
import {useToggleTodo} from '../model/use-toggle-todo.js'

export function TodoList() {
    const { error, list, isPlaceholderData, isLoading, pagination } = useTodoList()
    const {handleSubmit, isPending} = useCreateTodo()
    const {deleteTodo, pendingId: deletingId} = useDeleteTodo()
    const {toggleTodo, pendingId: togglingId} = useToggleTodo()

    if (error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    return (
        <>
            <h1>TodoList</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="text" placeholder="Enter your task ..." />
                <button disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create'}
                </button>
            </form>

            <ul className={isPlaceholderData ? 'isFetching' : ''}>
                {isLoading ? <div>LOADING...</div> : list?.items?.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={!!todo.done}
                            disabled={togglingId === todo.id}
                            onChange={() => toggleTodo(todo)}
                        />
                        {todo.text}
                        <button
                            disabled={deletingId === todo.id}
                            onClick={() => deleteTodo(todo.id)}
                        >
                            {deletingId === todo.id ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>

            {pagination}
        </>
    )
}