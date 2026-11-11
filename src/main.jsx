import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {TodoList} from './components/todo-list.jsx'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <TodoList />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)