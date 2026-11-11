import {keepPreviousData, queryOptions} from '@tanstack/react-query'

const BASE_URL = 'https://83e68f322ce7782d.mokky.dev/todos'

const handleResponse = (res) => {
    if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.status}`)
    }
    return res.json()
}

export const todoService = {
    baseKey: 'todos',

    getTasks: ({ page }, { signal }) => {
        return fetch(`${BASE_URL}?page=${page}&limit=10&sortBy=-id`, {
            signal
        }).then(handleResponse)
    },

    getTasksQueryOptions: ({ page }) => {
        return queryOptions({
            queryKey: [todoService.baseKey, { page }],
            queryFn: (meta) => todoService.getTasks({ page }, meta),
            placeholderData: keepPreviousData,
        })
    },

    createTask: (payload) => {
        return fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(handleResponse)
    },

    deleteTask: (id) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка запроса: ${res.status}`)
            }
        })
    },

    toggleTask: ({ id, done }) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done })
        }).then(handleResponse)
    },
}