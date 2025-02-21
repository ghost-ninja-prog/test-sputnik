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

export type AddTaskType = {
    title: string,
    description: string,
    status: string
}

export type UpdateDataType = {
    id: number,
    payload: {
        data: {
            title: string,
            description: string,
            status: string
        }
    }
}

export type ResponseServerTaskType = {
    data: TaskType,
    meta: object
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

export type StoreType = {
    tasks: TaskType[],
    loading: boolean,
    page: number,
    pageCount: number,
    totalTasks: number,
    fetchTasks: (page?: number, pageSize?: number) => void,
    addTask: (task: AddTaskType) => void,
    updateTask: (updateData: UpdateDataType) => void,
    deleteTask: (id : number) => void
}

export const useTasksStore = create<StoreType>()((set, get) => ({
    tasks: [],
    totalTasks: 0,
    loading: false,
    page: 1,
    pageCount: 1,
    fetchTasks: async (page = 1, pageSize = 20) => {
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

    },
    addTask: async (task) => {
        try {
            const res = await fetch(`${BASE_URL}`, {
                method: 'POST',
                body: JSON.stringify({
                    data: {...task}
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            if(res.status !== 200) {
                throw new Error(`Error created todo: ${res.status} ${res.statusText}`);
            }
            const createdTask = await res.json() as ResponseServerTaskType
            set(state => ({
                tasks: [{...createdTask.data}, ...state.tasks]
            }))
            
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    },
    updateTask: async (updateData) => {
        try {
            const res = await fetch(`${BASE_URL}/${updateData.id}`, {
                method: 'PUT',
                body: JSON.stringify({...updateData.payload}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            if(res.status !== 200) {
                throw new Error(`Error updated todo: ${res.status} ${res.statusText}`);
            }

            const updateTask = await res.json() as ResponseServerTaskType

            console.log(updateTask.data.attributes.status)
            set((state) => ({
                tasks: state.tasks.map(task => task.id === updateTask.data.id ? updateTask.data : task)
            }))
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    },
    deleteTask: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            })
            if (response.status !== 200) {
                throw new Error(`Error delete todo, ${response.status}: ${response.statusText}`)
            }
            set(state => ({
                tasks: state.tasks.filter(task => task.id !== id)
            }))

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    },
}))