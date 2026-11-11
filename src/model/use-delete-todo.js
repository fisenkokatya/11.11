import {useMutation, useQueryClient} from '@tanstack/react-query'
import {todoService} from '../service/todo-service.js'

export function useDeleteTodo() {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: todoService.deleteTask,
        onError(error) {
            alert(`Не удалось удалить задачу: ${error.message}`)
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: [todoService.baseKey]
            })
        }
    })

    return {
        deleteTodo: deleteMutation.mutate,
        isPending: deleteMutation.isPending,
        pendingId: deleteMutation.isPending ? deleteMutation.variables : null
    }
}