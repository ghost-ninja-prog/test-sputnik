import { create } from "zustand";
import { TTaskType } from "./useTasksStore";
import { persist } from "zustand/middleware";


type TFavoritesStore = {
    favoritesTasks: TTaskType[],
    addToFavorites: (newTask: TTaskType) => void,
    updateFavorites: (updateTask: TTaskType) => void,
    deleteFromFavorites: (id: number) => void
}

export const useFavoritesStore = create<TFavoritesStore>()(
    persist(
        (set, get) => ({
            favoritesTasks: [],
            addToFavorites: (newTask) => {
                const ind = get().favoritesTasks.findIndex(todo => todo.id === newTask.id)
                if (ind !== -1) return

                set(state => ({
                    favoritesTasks: [
                        ...state.favoritesTasks,
                        {
                            ...newTask,
                            favorite: true
                        }
                    ]
                }))
            },
            updateFavorites: (updateTask) => {
                set(state => ({
                    favoritesTasks: state.favoritesTasks.map(task => task.id === updateTask.id ? updateTask : task)
                }))
            },
            deleteFromFavorites: (id) => {
                set(state => ({
                    favoritesTasks: state.favoritesTasks.filter(task => task.id !== id)
                }))
            }
        }),
        {
            name: 'favorites-storage'
        }
    )
)