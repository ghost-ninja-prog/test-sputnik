import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { server } from '../../../mocks/node';

import { TaskItem } from "../TaskItem";
import { TTaskType, useTasksStore } from "../../../store/useTasksStore";
import { useFavoritesStore } from '../../../store/useFavoritesStore';



const testTask: TTaskType = {
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

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('Test TaskItem', () => {
    const { updateTask, deleteTask } = useTasksStore.getState()
    const { addToFavorites, updateFavorites, deleteFromFavorites } = useFavoritesStore.getState()

    const user = userEvent.setup()

    const renderTask = (task: TTaskType) => {
        render(
            <TaskItem 
                task={task} 
                updateTask={updateTask}
                deleteTask={deleteTask}
                addToFavorites={addToFavorites}
                updateFavorites={updateFavorites}
                deleteFromFavorites={deleteFromFavorites}
            />
        )
    }

    it('should render with title and description from testTask', async () => {
        renderTask(testTask)

        expect( screen.getByTestId('checkboxTask') ).toBeInTheDocument()
        expect( screen.getByTestId('btnFavorites') ).toBeInTheDocument()
        expect( screen.getByTestId('titleTask') ).toBeInTheDocument()
        expect( screen.getByTestId('descriptionTask') ).toBeInTheDocument()
        expect( screen.getByTestId('btnEdit') ).toBeInTheDocument()
        expect( screen.getByTestId('btnDelete') ).toBeInTheDocument()


    }) 

    it('button "delete" delete task from useTasksStore', async () => {
        useTasksStore.setState({tasks: [{...testTask}]})
        const { tasks } = useTasksStore.getState()
        renderTask(tasks[0])

        await user.click(screen.getByTestId('btnDelete')) 

        const updTasks = useTasksStore.getState().tasks
        expect(updTasks).toHaveLength(0)
    })

    it('edit title and description task', async () => {
        useTasksStore.setState({tasks: [{ ...testTask }]})
        const { tasks } = useTasksStore.getState()
        const { rerender } = render(
            <TaskItem 
                task={tasks[0]}
                updateTask={updateTask}
                deleteTask={deleteTask}
                addToFavorites={addToFavorites}
                updateFavorites={updateFavorites}
                deleteFromFavorites={deleteFromFavorites}
            />
        )        
        expect(screen.getByTestId('titleTask')).toHaveTextContent('Test title')
        expect(screen.getByTestId('descriptionTask')).toHaveTextContent('Test description')
        
        await user.click(screen.getByTestId('btnEdit'))

        const inputTitle = screen.getByTestId('inputTitle') as HTMLInputElement
        const inputDescription = screen.getByTestId('inputDescription') as HTMLInputElement

        
        await user.clear(inputTitle)
        await user.keyboard('Edit Title')
        await user.clear(inputDescription)
        await user.keyboard('Edit Description')
        await user.click(screen.getByTestId('btnSave'))
       const updTask = useTasksStore.getState().tasks[0]
        rerender(
            <TaskItem 
                task={updTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                addToFavorites={addToFavorites}
                updateFavorites={updateFavorites}
                deleteFromFavorites={deleteFromFavorites}
            />
        )
        expect(screen.getByTestId('titleTask')).toHaveTextContent('Edit Title')
        expect(screen.getByTestId('descriptionTask')).toHaveTextContent('Edit Description')
    })

    it('checkbox updates the status in useTasksStore', async () => {
        useTasksStore.setState({ tasks: [{ ...testTask }] })
        const task = useTasksStore.getState().tasks[0]
        renderTask(task)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
        await user.click(screen.getByRole('checkbox'))
        expect(checkbox).not.toBeChecked()
        const updTask = useTasksStore.getState().tasks[0]
        expect(updTask.attributes.status).toBe('active')
    })

    it('btnFavorites added task to useFavoritesStore', async () => {
        renderTask(testTask)
        const favoritesTasks = useFavoritesStore.getState().favoritesTasks
        await user.click(screen.getByTestId('btnFavorites'))
        const updFavoritesTasks = useFavoritesStore.getState().favoritesTasks
        expect(updFavoritesTasks.length).toBe(favoritesTasks.length + 1)
    })

    it('btnDelete delete task from useFavoritesStore', async () => {
        useFavoritesStore.setState({ favoritesTasks: [{ ...testTask, favorite: true }] })
        const { favoritesTasks } = useFavoritesStore.getState()
        renderTask(favoritesTasks[0])
        await user.click(screen.getByTestId('btnDelete'))
        const updFavoritesTasks = useFavoritesStore.getState().favoritesTasks
        expect(updFavoritesTasks.length).toBe(favoritesTasks.length - 1)
    })

    it('changes the title and description in a favorite task', async () => {
        useFavoritesStore.setState({favoritesTasks: [{ ...testTask, favorite: true }]})
        const task = useFavoritesStore.getState().favoritesTasks[0]
        const { rerender } = render(
            <TaskItem 
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
                addToFavorites={addToFavorites}
                updateFavorites={updateFavorites}
                deleteFromFavorites={deleteFromFavorites}
            />
        )        
        expect(screen.getByTestId('titleTask')).toHaveTextContent('Test title')
        expect(screen.getByTestId('descriptionTask')).toHaveTextContent('Test description')
        
        await user.click(screen.getByTestId('btnEdit'))

        const inputTitle = screen.getByTestId('inputTitle') as HTMLInputElement
        const inputDescription = screen.getByTestId('inputDescription') as HTMLInputElement
        
        await user.clear(inputTitle)
        await user.keyboard('Edit Title Favorites')
        await user.clear(inputDescription)
        await user.keyboard('Edit Description Favorites')
        await user.click(screen.getByTestId('btnSave'))

       const updTask = useFavoritesStore.getState().favoritesTasks[0]
        rerender(
            <TaskItem 
                task={updTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                addToFavorites={addToFavorites}
                updateFavorites={updateFavorites}
                deleteFromFavorites={deleteFromFavorites}
            />
        )
        expect(screen.getByTestId('titleTask')).toHaveTextContent('Edit Title Favorites')
        expect(screen.getByTestId('descriptionTask')).toHaveTextContent('Edit Description Favorites')
    })

    it('checkbox updates the status in useFavoritesStore', async () => {
        useFavoritesStore.setState({ favoritesTasks: [{ ...testTask, favorite: true }] })
        const task = useFavoritesStore.getState().favoritesTasks[0]
        renderTask(task)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
        await user.click(screen.getByRole('checkbox'))
        expect(checkbox).not.toBeChecked()
        const updTask = useFavoritesStore.getState().favoritesTasks[0]
        expect(updTask.attributes.status).toBe('active')
    })
})