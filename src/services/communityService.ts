import type { CommunityPost } from '../types/domain'
import { COMMUNITY_API_PATH, isCommunityApiConfigured, request } from './http'

const STORAGE_KEY = 'soulup.community.posts.v1'
const API_PATH = COMMUNITY_API_PATH

const demoPosts: CommunityPost[] = [
  {
    id: 'post-1', author: 'Equipe Soul Up', title: 'Nosso primeiro passo coletivo',
    content: 'Separe os recicláveis da sua casa e compartilhe uma dica que facilite esse hábito na sua comunidade.',
    category: 'reciclagem', createdAt: '2026-10-28T12:00:00.000Z', likes: 12, visibility: 'public',
  },
  {
    id: 'post-2', author: 'Comunidade Soul Up', title: 'Pequenas atitudes economizam água',
    content: 'Cronometrar o banho e reaproveitar água sempre que possível são atitudes simples que fazem diferença.',
    category: 'agua', createdAt: '2026-10-30T12:00:00.000Z', likes: 8, visibility: 'public',
  },
]

function readDemoPosts(): CommunityPost[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) as CommunityPost[] : demoPosts
  } catch {
    return demoPosts
  }
}

function saveDemoPosts(posts: CommunityPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export const communityService = {
  async list(): Promise<CommunityPost[]> {
    if (isCommunityApiConfigured) return request<CommunityPost[]>(API_PATH)
    return readDemoPosts()
  },

  async create(input: Pick<CommunityPost, 'author' | 'title' | 'content' | 'category'>): Promise<CommunityPost> {
    if (isCommunityApiConfigured) return request<CommunityPost>(API_PATH, { method: 'POST', body: JSON.stringify(input) })
    const post: CommunityPost = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), likes: 0, visibility: 'public' }
    saveDemoPosts([post, ...readDemoPosts()])
    return post
  },

  async update(id: string, input: Partial<Pick<CommunityPost, 'title' | 'content' | 'category'>>): Promise<CommunityPost> {
    if (isCommunityApiConfigured) return request<CommunityPost>(`${API_PATH}/${id}`, { method: 'PUT', body: JSON.stringify(input) })
    const posts = readDemoPosts().map(post => post.id === id ? { ...post, ...input } : post)
    saveDemoPosts(posts)
    const updated = posts.find(post => post.id === id)
    if (!updated) throw new Error('Publicação não encontrada.')
    return updated
  },

  async remove(id: string): Promise<void> {
    if (isCommunityApiConfigured) return request<void>(`${API_PATH}/${id}`, { method: 'DELETE' })
    saveDemoPosts(readDemoPosts().filter(post => post.id !== id))
  },
}
