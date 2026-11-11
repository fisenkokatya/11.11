import {useMutation, useQueryClient} from '@tanstack/react-query'
import {todoService} from '../service/todo-service.js'

export function useCreateTodo() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: todoService.createTask,
        onError(error) {
            alert(`Не удалось создать задачу: ${error.message}`)
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: [todoService.baseKey]
            })
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        const text = formData.get('text') ?? ""
        if (!text.trim()) return

        createMutation.mutate({
            text,
            done: false
        })

        form.reset()
    }

    return {
        handleSubmit,
        isPending: createMutation.isPending
    }
}