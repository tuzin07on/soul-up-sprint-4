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
    const body = await response.json().catch(() => null) as { message?: string; error?: string } | null
    throw new HttpError(body?.message ?? body?.error ?? `A API respondeu com status ${response.status}.`, response.status)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof HttpError) return { message: error.message, status: error.status }
  if (error instanceof Error) return { message: error.message }
  return { message: 'Ocorreu um erro inesperado ao comunicar com o servidor.' }
}
