import { useState, type FormEvent } from 'react'
import { PageTitle } from '../components/PageTitle'
import { useCommunity } from '../context/CommunityContext'
import { isCommunityApiConfigured } from '../services/http'
import type { ChallengeCategory, CommunityPost } from '../types/domain'

const categories: { value: ChallengeCategory; label: string }[] = [
  { value: 'reciclagem', label: 'Reciclagem' },
  { value: 'agua', label: 'Água' },
  { value: 'energia', label: 'Energia' },
  { value: 'comunidade', label: 'Comunidade' },
]

const categoryLabel = (category: ChallengeCategory) => categories.find(item => item.value === category)?.label ?? 'Comunidade'

const MIN_CONTENT_LENGTH = 10

/** O atributo `required` aceita texto só com espaços, então a regra é conferida após o trim. */
function validatePost(title: string, content: string): string | null {
  if (!title) return 'Informe um título para a publicação.'
  if (content.length < MIN_CONTENT_LENGTH) return `A publicação precisa ter pelo menos ${MIN_CONTENT_LENGTH} caracteres.`
  return null
}

export function Community() {
  const { posts, loading, error, refresh, createPost, updatePost, removePost } = useCommunity()
  const [author, setAuthor] = useState('Visitante Soul Up')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<ChallengeCategory>('comunidade')
  const [editing, setEditing] = useState<CommunityPost | null>(null)
  const [feedback, setFeedback] = useState('')
  const [editError, setEditError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newAuthor = author.trim()
    const newTitle = title.trim()
    const newContent = content.trim()
    const invalid = newAuthor ? validatePost(newTitle, newContent) : 'Informe seu nome.'
    if (invalid) {
      setFeedback(invalid)
      return
    }
    setSaving(true)
    setFeedback('')
    try {
      await createPost({ author: newAuthor, title: newTitle, content: newContent, category })
      setTitle('')
      setContent('')
      setFeedback('Sua publicação foi adicionada à comunidade!')
    } catch (cause) {
      setFeedback(cause instanceof Error ? cause.message : 'Não foi possível publicar agora.')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    const newTitle = editing.title.trim()
    const newContent = editing.content.trim()
    const invalid = validatePost(newTitle, newContent)
    if (invalid) {
      setEditError(invalid)
      return
    }
    setSaving(true)
    setEditError('')
    try {
      await updatePost(editing.id, { title: newTitle, content: newContent, category: editing.category })
      setEditing(null)
      setFeedback('Publicação atualizada com sucesso.')
    } catch (cause) {
      setEditError(cause instanceof Error ? cause.message : 'Não foi possível atualizar a publicação.')
    } finally {
      setSaving(false)
    }
  }

  async function handleRemove(id: string) {
    if (!window.confirm('Deseja excluir esta publicação?')) return
    try {
      await removePost(id)
      setFeedback('Publicação excluída.')
    } catch (cause) {
      setFeedback(cause instanceof Error ? cause.message : 'Não foi possível excluir a publicação.')
    }
  }

  return <>
    <PageTitle title="Comunidade Soul Up" text="Compartilhe suas ideias, conte suas pequenas conquistas e inspire outras pessoas a agir." />
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[.85fr_1.15fr]">
      <aside className="h-fit rounded-3xl bg-forest p-7 text-white shadow-xl shadow-forest/10 md:p-9">
        <span className="text-4xl" aria-hidden="true">💬</span>
        <p className="mt-5 text-xs font-bold tracking-[.18em] text-blue-100">SUA VOZ FAZ A DIFERENÇA</p>
        <h2 className="mt-3 font-serif text-3xl font-bold">Uma boa ideia cresce quando é compartilhada.</h2>
        <p className="mt-4 leading-7 text-blue-100">Publique uma dica, uma iniciativa ou uma experiência sustentável. A comunidade aprende junto e transforma inspiração em atitude.</p>
        <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-blue-50">
          <strong className="block text-white">{isCommunityApiConfigured ? 'Conectado à API' : 'Mural local'}</strong>
          {isCommunityApiConfigured ? 'As publicações são carregadas pelo serviço remoto configurado.' : 'A API Java atual não possui recurso de publicações; este mural fica salvo neste navegador.'}
        </div>
      </aside>

      <div className="space-y-6">
        <form onSubmit={handleCreate} className="rounded-3xl border border-forest/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-serif text-2xl font-bold text-forest">Compartilhe com a comunidade</h2>
          <label className="mt-5 block text-sm font-semibold text-slate-700">Seu nome
            <input value={author} onChange={event => setAuthor(event.target.value)} required maxLength={60} className="mt-2 w-full rounded-xl border border-slate-200 bg-sand px-4 py-3 outline-none focus:border-forest focus:ring-4 focus:ring-mint" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Título
            <input value={title} onChange={event => setTitle(event.target.value)} required maxLength={90} placeholder="Ex.: Minha primeira horta comunitária" className="mt-2 w-full rounded-xl border border-slate-200 bg-sand px-4 py-3 outline-none focus:border-forest focus:ring-4 focus:ring-mint" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Categoria
            <select value={category} onChange={event => setCategory(event.target.value as ChallengeCategory)} className="mt-2 w-full rounded-xl border border-slate-200 bg-sand px-4 py-3 outline-none focus:border-forest focus:ring-4 focus:ring-mint">
              {categories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-slate-700">Sua publicação
            <textarea value={content} onChange={event => setContent(event.target.value)} required minLength={10} maxLength={600} rows={4} placeholder="Conte sua ideia ou experiência..." className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-sand px-4 py-3 outline-none focus:border-forest focus:ring-4 focus:ring-mint" />
          </label>
          <button disabled={saving} className="mt-5 w-full rounded-xl bg-forest px-5 py-3 font-bold text-white transition hover:bg-clay disabled:cursor-wait disabled:opacity-60">{saving ? 'Publicando...' : 'Publicar ideia'}</button>
          {feedback && <p role="status" className="mt-3 text-sm font-medium text-forest">{feedback}</p>}
        </form>

        <div className="flex items-center justify-between gap-3"><h2 className="font-serif text-2xl font-bold text-forest">Mural da comunidade</h2><button onClick={() => void refresh()} className="rounded-full border border-forest/20 px-4 py-2 text-sm font-bold text-forest hover:bg-mint">Atualizar</button></div>
        {loading && <p className="rounded-2xl bg-white p-6 text-slate-600" role="status">Carregando publicações...</p>}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"><p>{error}</p><button onClick={() => void refresh()} className="mt-3 font-bold underline">Tentar novamente</button></div>}
        {!loading && !error && posts.length === 0 && <div className="rounded-2xl border border-dashed border-forest/20 bg-white p-8 text-center"><p className="text-3xl">🌱</p><h3 className="mt-3 font-bold text-forest">O mural está começando</h3><p className="mt-2 text-sm text-slate-500">Seja a primeira pessoa a compartilhar uma ideia.</p></div>}
        {posts.map(post => <article key={post.id} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-forest">{categoryLabel(post.category)}</span><time className="text-xs text-slate-400" dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</time></div>
          {editing?.id === post.id ? <form onSubmit={handleUpdate} className="mt-4 space-y-3"><input value={editing.title} onChange={event => setEditing({ ...editing, title: event.target.value })} required maxLength={90} className="w-full rounded-lg border border-slate-200 px-3 py-2" /><textarea value={editing.content} onChange={event => setEditing({ ...editing, content: event.target.value })} required minLength={10} maxLength={600} rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2" /><select value={editing.category} onChange={event => setEditing({ ...editing, category: event.target.value as ChallengeCategory })} className="w-full rounded-lg border border-slate-200 px-3 py-2">{categories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select>{editError && <p role="alert" className="text-sm font-medium text-red-600">{editError}</p>}<div className="flex gap-3"><button disabled={saving} className="rounded-lg bg-forest px-4 py-2 text-sm font-bold text-white">Salvar</button><button type="button" onClick={() => { setEditing(null); setEditError('') }} className="rounded-lg border px-4 py-2 text-sm font-bold text-slate-600">Cancelar</button></div></form> : <><h3 className="mt-4 font-serif text-2xl font-bold text-forest">{post.title}</h3><p className="mt-3 leading-7 text-slate-600">{post.content}</p><p className="mt-4 text-xs font-semibold text-slate-500">Por {post.author}</p><div className="mt-4 flex gap-4 border-t border-slate-100 pt-4"><button onClick={() => { setEditing(post); setEditError('') }} className="text-sm font-bold text-forest underline underline-offset-4">Editar</button><button onClick={() => void handleRemove(post.id)} className="text-sm font-bold text-red-600 underline underline-offset-4">Excluir</button></div></>}
        </article>)}
      </div>
    </section>
  </>
}
