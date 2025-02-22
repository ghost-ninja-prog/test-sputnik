import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { TaskItem } from "./TaskItem";
import { TaskType } from "../../store/useTasksStore";



const testTask: TaskType = {
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

describe('Test TaskItem', () => {
    test('should render with title and description from testTask', async () => {
        const { container } = render(<TaskItem task={testTask} />)
        const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement
        expect(checkbox.checked).toBeTruthy()
        expect( await screen.findByText('Test title')).toBeInTheDocument()
        expect( await screen.findByText('Test description')).toBeInTheDocument()
    })
})