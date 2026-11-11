import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {todoService} from '../service/todo-service.js'

export function useTodoList() {
    const [page, setPage] = useState(1)

    const { data, error, isLoading, isPlaceholderData, refetch } = useQuery({
        ...todoService.getTasksQueryOptions({ page }),
    })

    const pagination = (
        <div>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                prev
            </button>
            <button onClick={() => setPage((p) => Math.min(p + 1, data?.meta?.total_pages))}>
                next
            </button>
        </div>
    )

    return {
        list: data,
        error,
        isLoading,
        isPlaceholderData,
        pagination,
        refetch
    }
}