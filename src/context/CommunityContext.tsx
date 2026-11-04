/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CommunityPost } from '../types/domain'
import { communityService } from '../services/communityService'
import { toApiError } from '../services/http'

type CommunityContextValue = {
  posts: CommunityPost[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  createPost: (input: Pick<CommunityPost, 'author' | 'title' | 'content' | 'category'>) => Promise<void>
  updatePost: (id: string, input: Partial<Pick<CommunityPost, 'title' | 'content' | 'category'>>) => Promise<void>
  removePost: (id: string) => Promise<void>
}

const CommunityContext = createContext<CommunityContextValue | undefined>(undefined)

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setPosts(await communityService.list())
    } catch (cause) {
      setError(toApiError(cause).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isActive = true

    const loadPosts = async () => {
      setLoading(true)
      setError(null)

      try {
        const nextPosts = await communityService.list()
        if (!isActive) return
        setPosts(nextPosts)
      } catch (cause) {
        if (!isActive) return
        setError(toApiError(cause).message)
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadPosts()

    return () => {
      isActive = false
    }
  }, [])

  const createPost = useCallback(async (input: Pick<CommunityPost, 'author' | 'title' | 'content' | 'category'>) => {
    const created = await communityService.create(input)
    setPosts(current => [created, ...current])
  }, [])

  const updatePost = useCallback(async (id: string, input: Partial<Pick<CommunityPost, 'title' | 'content' | 'category'>>) => {
    const updated = await communityService.update(id, input)
    setPosts(current => current.map(post => post.id === id ? updated : post))
  }, [])

  const removePost = useCallback(async (id: string) => {
    await communityService.remove(id)
    setPosts(current => current.filter(post => post.id !== id))
  }, [])

  const value = useMemo(() => ({ posts, loading, error, refresh, createPost, updatePost, removePost }), [posts, loading, error, refresh, createPost, updatePost, removePost])
  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (!context) throw new Error('useCommunity deve ser utilizado dentro de CommunityProvider.')
  return context
}
