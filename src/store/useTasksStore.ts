import { create } from "zustand"


export const BASE_URL = 'https://cms.laurence.host/api/tasks'


export type TaskType = {
    id: number,
    attributes: {
        status: string,
        title: string,
        description: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string
    }
}

export type StoreType = {
    tasks: TaskType[],
    loading: boolean,
    page: number,
    pageCount: number,
    totalTasks: number,
    fetchTasks: (page?: number, pageSize?: number) => void
}


type ResponseServerType = {
    data: TaskType[],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}


export const useTasksStore = create<StoreType>((set, get) => ({
    tasks: [],
    totalTasks: 0,
    loading: false,
    page: 1,
    pageCount: 1,
    fetchTasks: async (page = 1, pageSize = 5) => {
        if(get().loading) return
        try {
            set({loading: true})
            const res = await fetch(`${BASE_URL}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
            const data = await res.json() as ResponseServerType
            set(state => ({
                tasks: state.tasks.concat(data.data),
                totalTasks: data.meta.pagination.total,
                page: data.meta.pagination.page,
                pageCount: data.meta.pagination.pageCount
            }))
            
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            set({loading: false})
        }

    }
}))