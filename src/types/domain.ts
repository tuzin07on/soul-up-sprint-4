export type ChallengeCategory = 'reciclagem' | 'agua' | 'energia' | 'comunidade'
export type ChallengeStatus = 'available' | 'completed'
export type PostVisibility = 'public' | 'private'

export interface Challenge {
  id: string
  title: string
  description: string
  category: ChallengeCategory
  points: number
  duration: string
}

export interface SustainableAction {
  codigo: number
  codigoCategoria: number
  nome: string
  descricao: string | null
  pontosEcoa: number
  ativo: boolean
}

export interface ActionCategory {
  codigo: number
  nome: string
  descricao: string | null
}

export interface UserActionRegistration {
  codigo: number
  codigoUsuario: number
  codigoAcao: number
  dataRealizacao: string | null
  pontosGanhos: number | null
  evidenciaUrl: string | null
  status: string
}

export interface CommunityPost {
  id: string
  author: string
  title: string
  content: string
  category: ChallengeCategory
  createdAt: string
  likes: number
  visibility: PostVisibility
}

export interface MemberProfile {
  name: string
  rm: string
  className: string
  github: string
  linkedin: string
}

export type TeamMember = MemberProfile & {
  role: string
  photo: string
}

export interface ApiError {
  message: string
  status?: number
}

export type AsyncState<T> =
  | { status: 'idle' | 'loading'; data: T | null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: T | null; error: ApiError }

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError }
