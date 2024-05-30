import { create } from "zustand";
import axios from "axios";

const URL = 'https://cms.dev-land.host/api/tasks'

type UpdateData = {
    id: number,
    payload: {
        data: {
            title: string,
            description: string,
            status: string
        }
    }
}

type AddTodo = {
    data: {
        title: string,
        description: string,
        status: string
    }
}
type TodoType = {
    id: number,
    attributes: {
        title: string,
        description: string,
        status: string
    }
}


type StoreType = {
    todos: TodoType[],
    loading: boolean,
    fetchTodos: (page?: number) => void,
    updateTodo: (obj: UpdateData) => void,
    deleteTodo: (id: number) => void,
    addTodo: (obj: AddTodo) => void
}

export const useTodoStore = create<StoreType>((set) => ({
    todos: [],
    loading: false,

    fetchTodos: async () => {
    
        set({ loading: true })
        axios(URL)
            .then(res => set({ todos: res.data.data }) )
            .catch(e => console.log(e.message))
            .finally(() => set({ loading: false }))
    },

    addTodo: async (obj) => {
        const newTodo = await axios.post(URL, obj).catch((e) => console.log(e.massage))
        if (newTodo?.status === 200) {
            set((state) => ({
                todos: [
                    ...state.todos,
                    {   id: newTodo.data.data.id,
                        attributes: {
                            title: obj.data.title,
                            description: obj.data.description,
                            status: obj.data.status
                        }
                    }
                ]
            }))
        }
    },

    updateTodo: async (updateData) => {
        const modifiedItem = await axios.put(`${URL}/${updateData.id}`, updateData.payload).catch((e) => console.log(e.message))
        
        if ( modifiedItem?.status === 200 ) {
            set(state => ({
                todos: state.todos.map(todo => {
                    if (todo.id === updateData.id) {
                        return {
                            id: todo.id,
                            attributes: {
                                title: modifiedItem?.data.data.attributes.title,
                                description: modifiedItem?.data.data.attributes.description,
                                status: modifiedItem?.data.data.attributes.status
                            }
                        }
                    }
                    return todo
                })
            }))
        }
    },
    
    deleteTodo: async (id) => {
        const deleteTodo = await axios.delete(`${URL}/${id}`).catch(e => console.log(e.message))
        if ( deleteTodo?.status === 200 ) {
            set(state => ({
                todos: state.todos.filter(todo => todo.id !== id)
            }))
        }
}
}))