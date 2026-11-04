import type { ApiError } from '../types/domain'

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') || 'https://soulup-api-x6cl.onrender.com'

export const isApiConfigured = API_BASE_URL.length > 0
const COMMUNITY_API_PATH = import.meta.env.VITE_API_COMMUNITY_PATH?.trim() ?? ''
export const isCommunityApiConfigured = isApiConfigured && COMMUNITY_API_PATH.length > 0
export { COMMUNITY_API_PATH }

export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

function getErrorMessage(body: unknown): string | undefined {
  if (typeof body === 'string') return body.trim() || undefined
  if (!body || typeof body !== 'object') return undefined

  const response = body as {
    message?: unknown
    error?: unknown
    errors?: unknown
  }
  if (typeof response.message === 'string' && response.message.trim()) return response.message
  if (typeof response.error === 'string' && response.error.trim()) return response.error

  if (Array.isArray(response.errors)) {
    const messages = response.errors
      .map(error => {
        if (typeof error === 'string') return error
        if (!error || typeof error !== 'object') return null
        const detail = error as { defaultMessage?: unknown; message?: unknown }
        if (typeof detail.defaultMessage === 'string') return detail.defaultMessage
        if (typeof detail.message === 'string') return detail.message
        return null
      })
      .filter((message): message is string => Boolean(message))

    if (messages.length > 0) return messages.join(' ')
  }

  return undefined
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!isApiConfigured) {
    throw new Error('API Java ainda não configurada. Defina VITE_API_URL no arquivo .env.local.')
  }

  const response = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  if (!response.ok) {
    const responseBody = await response.text()
    let body: unknown
    try {
      body = JSON.parse(responseBody) as unknown
    } catch {
      body = responseBody
    }

    throw new HttpError(
      getErrorMessage(body) ?? `A API respondeu com status ${response.status}.`,
      response.status,
    )
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof HttpError) return { message: error.message, status: error.status }
  if (error instanceof Error) return { message: error.message }
  return { message: 'Ocorreu um erro inesperado ao comunicar com o servidor.' }
}
