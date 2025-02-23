import { describe, expect, test } from "vitest"
import { useFavoritesStore } from "../useFavoritesStore"
import { TTaskType } from "../useTasksStore"


const mockTask: TTaskType = {
    id: 1,
    attributes: {
        status: 'completed',
        title: 'Test title',
        description: 'Test description',
        createdAt: '2025-02-22T05:55:42.460Z',
        updatedAt: '2025-02-22T05:55:42.460Z',
        publishedAt: '2025-02-22T05:55:42.459Z'
    }
}

describe('Tests useFavoritesStore', () => {
    test('test addToFavorites', () => {
        const state = useFavoritesStore.getState()
        state.addToFavorites(mockTask)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTasks[0]).toEqual({ favorite: true, ...mockTask })
    })
    test('test updateFavorites', () => {
        const updateTask: TodoType = {
            id: 1,
            attributes: {
                status: 'active',
                title: 'Test Edit title',
                description: 'Test Edit description',
                createdAt: '2025-02-22T05:55:42.460Z',
                updatedAt: '2025-02-22T05:55:42.460Z',
                publishedAt: '2025-02-22T05:55:42.459Z'
            }
        }
        useFavoritesStore.setState({ favoritesTasks: [{ ...mockTask }] })
        const state = useFavoritesStore.getState()
        state.updateFavorites(updateTask)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTasks[0].attributes.title).toBe('Test Edit title')
        expect(newState.favoritesTasks[0].attributes.description).toBe('Test Edit description')
        expect(newState.favoritesTasks[0].attributes.status).toBe('active')
    })
    test('test deleteFromFavorites', () => {
        useFavoritesStore.setState({ favoritesTasks: [{ ...mockTask }] })
        const state = useFavoritesStore.getState()
        expect(state.favoritesTasks).toHaveLength(1)
        state.deleteFromFavorites(1)
        const newState = useFavoritesStore.getState()
        expect(newState.favoritesTasks).toHaveLength(0)
    })
})