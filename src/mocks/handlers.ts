import { http, HttpResponse } from "msw";
import { BASE_URL, ResponseServerTaskType, ResponseServerType, TaskType } from "../store/useTasksStore";
import { mockTasks } from "./mockTasksDB";


type ReqTask = {
    data: {
        status: string,
        title: string,
        description: string
    }
}

export const handlers = [
    http.get(`${BASE_URL}*`, ({ request }) => {
        const url = new URL(request.url)
        const queryPage = url.searchParams.get('pagination[page]')
        const queryPageSize = url.searchParams.get('pagination[pageSize]')

        const responseTasks = mockTasks.filter((_, index) => index >= (Number(queryPage) - 1) * Number(queryPageSize) && index < (Number(queryPage) * Number(queryPageSize)))

        const responseObj: ResponseServerType = {
            data: responseTasks,
            meta: {
                pagination: {
                    page: Number(queryPage),
                    pageSize: Number(queryPageSize),
                    pageCount: Math.ceil(mockTasks.length / Number(queryPageSize)),
                    total: mockTasks.length
                }
            }
        }
        return HttpResponse.json(responseObj)

    }),

    http.post(`${BASE_URL}`, async ({ request }) => {

        const requestTask = await request.json() as ReqTask

        const createdTask: TaskType = {
            id: 10,
            attributes: {
                status: requestTask.data.status,
                title: requestTask.data.title,
                description: requestTask.data.description,
                createdAt: '2025-01-23T05:55:42.460Z',
                updatedAt: '2025-01-23T05:55:42.460Z',
                publishedAt: '2025-01-23T05:55:42.459Z'
            }
        }

        const responseObj: ResponseServerTaskType = {
            data: createdTask,
            meta: {}
        }
        return HttpResponse.json(responseObj, { status: 200 })
    }),

    http.put(`${BASE_URL}/:id`, async ({ request, params }) => {
        const { id } = params
        const requestTask = await request.json() as ReqTask

        const updatedTask: TaskType = {
            id: Number(id),
            attributes: {
                status: requestTask.data.status,
                title: requestTask.data.title,
                description: requestTask.data.description,
                createdAt: '2025-01-23T05:55:42.460Z',
                updatedAt: '2025-01-23T05:55:42.460Z',
                publishedAt: '2025-01-23T05:55:42.459Z'
            }
        }
        const responseObj = {
            data: updatedTask,
            meta: {}
        }
        return HttpResponse.json(responseObj, { status: 200 })
    }),
    http.delete(`${BASE_URL}/:id`, ()  => {
      return HttpResponse.json({
        status: 200
      })
    }),
]