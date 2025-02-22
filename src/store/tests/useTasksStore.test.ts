import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { AddTaskType, TaskType, UpdateDataType, useTasksStore } from "../useTasksStore";
import { waitFor } from "@testing-library/dom";
import { server } from "../../mocks/node";


const mockTasks: TaskType[] = [
    {
        id: 1,
        attributes: {
            status: 'completed',
            title: 'Test title 1',
            description: 'Test description 2',
            createdAt: '2025-02-22T05:55:42.460Z',
            updatedAt: '2025-02-22T05:55:42.460Z',
            publishedAt: '2025-02-22T05:55:42.459Z'
        }
    },
    {
        id: 2,
        attributes: {
            status: 'active',
            title: 'Test title 2',
            description: 'Test description 2',
            createdAt: '2025-02-21T05:55:42.460Z',
            updatedAt: '2025-02-21T05:55:42.460Z',
            publishedAt: '2025-02-21T05:55:42.459Z'
        }
    }
]

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())



describe('Tests useTasksStore', () => {
    test('test fetchTasks', async () => {

        const state = useTasksStore.getState()
        await waitFor(() => state.fetchTasks(2, 3))
        const newState = useTasksStore.getState()

        expect(newState.tasks).toHaveLength(3)
        expect(newState.page).toBe(2)
        expect(newState.totalTasks).toBe(7)
        expect(newState.pageCount).toBe(3)
    })

    test('test addTask', async () => {
        const task: AddTaskType = {
            title: 'Created Task',
            description: 'Description Cerated Task',
            status: 'active'
        }
        const state = useTasksStore.getState()
        await waitFor(() => state.addTask(task))

        const newState = useTasksStore.getState()
        const createdTask = newState.tasks[0]

        expect(createdTask.attributes.title).toBe('Created Task')
        expect(createdTask.attributes.description).toBe('Description Cerated Task')
        expect(createdTask.attributes.status).toBe('active')
    })

    test('test updateTask', async () => {
        useTasksStore.setState({tasks: mockTasks})
        const state = useTasksStore.getState()
        const updateTask: UpdateDataType = {
            id: 1,
            payload: {
                data: {
                    status: 'active',
                    title: 'Updated Task',
                    description: 'Updated description'
                }
            }
        } 
        await waitFor(() => state.updateTask(updateTask))
        const newState = useTasksStore.getState()
        expect(newState.tasks[0].attributes.status).toBe('active')
        expect(newState.tasks[0].attributes.title).toBe('Updated Task')
        expect(newState.tasks[0].attributes.description).toBe('Updated description')
    })

    test('delete todo', async () => {        
        useTasksStore.setState({tasks: mockTasks})
        const state = useTasksStore.getState()
        await waitFor(() => state.deleteTask(1))
        const newState = useTasksStore.getState()
        expect(newState.tasks).toHaveLength(1)
    })
})