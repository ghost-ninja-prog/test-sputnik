import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type TodosFavoritesType = {
    favorites?: boolean,
    id: number,
    attributes: {
        title: string,
        description: string,
        status: string
    }
}

type UpdateFavorites = {
    id: number,
    favorites: boolean
    attributes: {
        title: string,
        description: string,
        status: string
    }
}

type FavoritesState = {
    favoritesTodos: TodosFavoritesType[],
    addToFavorites: (obj: TodosFavoritesType) => void,
    updateFavotites: (obj: UpdateFavorites) => void,
    removeFromFavorites: (id: number) => void
}



export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({

            favoritesTodos: [],

            addToFavorites: (newTodo) => {
                const ind = get().favoritesTodos.findIndex(todo => todo.id === newTodo.id)
                if(ind !== -1) {
                    return
                }
                set((state) => ({
                    favoritesTodos: [
                        ...state.favoritesTodos,
                        {
                            favorites: true,
                            id: newTodo.id,
                            attributes: {
                                title: newTodo.attributes.title,
                                description: newTodo.attributes.description,
                                status: newTodo.attributes.status
                            }
                        }
                    ]
                }))
            },

            updateFavotites: (updateData) => {
                set(state => ({
                    favoritesTodos: state.favoritesTodos.map(todo => {
                        if (todo.id === updateData.id) {
                            return {
                                id: todo.id,
                                favorites: true,
                                attributes: {
                                    title: updateData.attributes.title,
                                    description: updateData.attributes.description,
                                    status: updateData.attributes.status
                                }
                            }
                        }
                        return todo
                    })
                }))
            },
            
            removeFromFavorites: (id) => {
                set(state => ({
                    favoritesTodos: state.favoritesTodos.filter(todo => todo.id !== id)
                }))
            }
        }),
        {
            name: 'favorites',
            storage: createJSONStorage(() => localStorage)
            
        }
    )
)

