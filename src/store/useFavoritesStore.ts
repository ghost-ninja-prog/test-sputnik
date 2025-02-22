import { create } from "zustand";
import { TaskType } from "./useTasksStore";
import { persist } from "zustand/middleware";


type FavoritesStore = {
    favoritesTasks: TaskType[],
    addToFavorites: (newTask: TaskType) => void,
    updateFavorites: (updateTask: TaskType) => void,
    deleteFromFavorites: (id: number) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
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