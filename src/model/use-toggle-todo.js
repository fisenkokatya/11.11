import {useMutation, useQueryClient} from '@tanstack/react-query'
import {todoService} from '../service/todo-service.js'

export function useToggleTodo() {
    const queryClient = useQueryClient()

    const toggleMutation = useMutation({
        mutationFn: todoService.toggleTask,
        onError(error) {
            alert(`Не удалось изменить статус: ${error.message}`)
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: [todoService.baseKey]
            })
        }
    })

    const toggleTodo = (todo) => {
        toggleMutation.mutate({ id: todo.id, done: !todo.done })
    }

    return {
        toggleTodo,
        isPending: toggleMutation.isPending,
        pendingId: toggleMutation.isPending ? toggleMutation.variables.id : null
    }
}