import { create } from "zustand";
import { TTaskType } from "./useTasksStore";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


type TStore = {
    favoritesTasks: TTaskType[],
    
}

type TActions = {
    addToFavorites: (newTask: TTaskType) => void,
    updateFavorites: (updateTask: TTaskType) => void,
    deleteFromFavorites: (id: number) => void
}

export const useFavoritesStore = create<TStore & TActions>()(
    persist(
        immer((set, get) => ({
            favoritesTasks: [],
            addToFavorites: (newTask) => {    
                            
                const ind = get().favoritesTasks.findIndex(todo => todo.id === newTask.id)
                if (ind !== -1) return

                return set(state => {
                    state.favoritesTasks.push({...newTask, favorite: true})
                })
            },
            updateFavorites: (updateTask) => 
                set(state => {
                    const indObj = get().favoritesTasks.findIndex(task => task.id === updateTask.id)
                    state.favoritesTasks[indObj].attributes = updateTask.attributes
                })
            ,
            deleteFromFavorites: (id) => {
                const ind = get().favoritesTasks.findIndex(todo => todo.id === id)
                return set(state => {
                    state.favoritesTasks.splice(ind, 1)
                })
            }
        })),
        {
            name: 'favorites-storage'
        }
    )
)