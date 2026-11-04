import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { sustainableActionService } from '../services/sustainableActionService'
import { toApiError } from '../services/http'
import type { ActionCategory, SustainableAction, UserActionRegistration } from '../types/domain'

const approvedStatus = 'APROVADO'
const pendingStatus = 'PENDENTE'
const registrationStatusLabels: Record<string, string> = {
  APROVADO: 'Aprovada',
  PENDENTE: 'Em análise',
  REJEITADO: 'Não aprovada',
}

export function Challenges() {
  const [actions, setActions] = useState<SustainableAction[]>([])
  const [categories, setCategories] = useState<ActionCategory[]>([])
  const [registrations, setRegistrations] = useState<UserActionRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [userCodeInput, setUserCodeInput] = useState('')
  const [userCode, setUserCode] = useState<number | null>(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userError, setUserError] = useState<string | null>(null)
  const [registeringCode, setRegisteringCode] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadCatalog() {
      try {
        const catalog = await sustainableActionService.listCatalog()
        if (!active) return
        setActions(catalog.actions)
        setCategories(catalog.categories)
      } catch (cause) {
        if (active) setError(toApiError(cause).message)
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadCatalog()
    return () => {
      active = false
    }
  }, [])

  const categoryNames = useMemo(
    () => new Map(categories.map(category => [category.codigo, category.nome])),
    [categories],
  )

  const visibleActions = actions.filter(action => filter === 'all' || String(action.codigoCategoria) === filter)
  const approvedRegistrations = registrations.filter(registration => registration.status === approvedStatus)
  const approvedActionCount = new Set(approvedRegistrations.map(registration => registration.codigoAcao)).size
  const earnedPoints = approvedRegistrations.reduce((total, registration) => total + (registration.pontosGanhos ?? 0), 0)
  const progress = actions.length > 0 ? Math.min(100, Math.round((approvedActionCount / actions.length) * 100)) : 0

  async function connectUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = Number(userCodeInput)
    if (!Number.isSafeInteger(code) || code <= 0) {
      setUserError('Informe um código de usuário válido.')
      return
    }

    setUserLoading(true)
    setUserError(null)
    setFeedback(null)
    try {
      const userRegistrations = await sustainableActionService.listUserRegistrations(code)
      setUserCode(code)
      setRegistrations(userRegistrations)
    } catch (cause) {
      setUserCode(null)
      setRegistrations([])
      setUserError(toApiError(cause).message)
    } finally {
      setUserLoading(false)
    }
  }

  async function registerAction(action: SustainableAction) {
    if (userCode === null) {
      setFeedback('Informe o código de um usuário cadastrado para registrar sua participação.')
      return
    }

    setRegisteringCode(action.codigo)
    setFeedback(null)
    try {
      const registration = await sustainableActionService.register(userCode, action.codigo)
      setRegistrations(current => [registration, ...current])
      setFeedback('Participação registrada na API! Ela ficará pendente até ser aprovada.')
    } catch (cause) {
      setFeedback(toApiError(cause).message)
    } finally {
      setRegisteringCode(null)
    }
  }

  function getRegistration(actionCode: number) {
    return [...registrations]
      .filter(registration => registration.codigoAcao === actionCode)
      .sort((left, right) => right.codigo - left.codigo)
      .find(registration => registration.status !== 'REJEITADO')
  }

  function getActionName(actionCode: number) {
    return actions.find(action => action.codigo === actionCode)?.nome ?? `Ação ${actionCode}`
  }

  function formatRegistrationDate(date: string | null) {
    if (!date) return 'Data não informada'
    const parsedDate = new Date(date)
    return Number.isNaN(parsedDate.getTime()) ? 'Data não informada' : parsedDate.toLocaleDateString('pt-BR')
  }

  return <>
    <PageTitle title="Desafios sustentáveis" text="Conheça ações sustentáveis da API Soul Up, registre sua participação e acompanhe os pontos aprovados." />
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid gap-5 rounded-3xl bg-forest p-7 text-white md:grid-cols-[1fr_auto] md:items-center md:p-9">
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-blue-100">SEU PROGRESSO NA API</p>
          <h2 className="mt-2 font-serif text-3xl font-bold">Cada atitude conta.</h2>
          <p className="mt-2 text-sm text-blue-100">Os pontos são contabilizados após a aprovação do registro.</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-blue-200 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-blue-100">{approvedActionCount} de {actions.length} ações aprovadas · {progress}%</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 px-7 py-5 text-center">
          <span className="text-3xl" aria-hidden="true">⭐</span>
          <p className="mt-2 text-3xl font-bold">{earnedPoints}</p>
          <p className="text-xs text-blue-100">Ecoa Points aprovados</p>
        </div>
      </div>

      <form onSubmit={connectUser} className="mt-7 flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white p-5 sm:flex-row sm:items-end">
        <label className="flex-1 text-sm font-semibold text-slate-700">
          Código do usuário cadastrado na API
          <input
            type="number"
            min="1"
            required
            value={userCodeInput}
            onChange={event => setUserCodeInput(event.target.value)}
            placeholder="Ex.: 7"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-sand px-4 py-3 outline-none focus:border-forest focus:ring-4 focus:ring-mint"
          />
        </label>
        <button disabled={userLoading} className="rounded-xl bg-forest px-5 py-3 font-bold text-white transition hover:bg-clay disabled:cursor-wait disabled:opacity-60">
          {userLoading ? 'Consultando...' : 'Carregar meu progresso'}
        </button>
        <p className="text-xs text-slate-500 sm:basis-full">A API ainda não possui autenticação; use o código de um usuário já cadastrado no serviço Java.</p>
      </form>
      {userError && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">{userError}</p>}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[.16em] text-clay">AÇÕES DISPONÍVEIS</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-forest">Desafios da comunidade</h2>
        </div>
        <label className="text-sm font-semibold text-slate-600">
          Filtrar por categoria
          <select value={filter} onChange={event => setFilter(event.target.value)} className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <option value="all">Todas</option>
            {categories.map(category => <option key={category.codigo} value={category.codigo}>{category.nome}</option>)}
          </select>
        </label>
      </div>

      {loading && <p role="status" className="mt-7 rounded-2xl bg-white p-6 text-slate-600">Carregando ações da API Java...</p>}
      {error && <div role="alert" className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"><p>{error}</p><button onClick={() => window.location.reload()} className="mt-3 font-bold underline">Tentar novamente</button></div>}
      {!loading && !error && actions.length === 0 && <div className="mt-7 rounded-2xl border border-dashed border-forest/20 bg-white p-8 text-center"><p className="text-3xl" aria-hidden="true">🌱</p><h3 className="mt-3 font-bold text-forest">Nenhuma ação disponível</h3><p className="mt-2 text-sm text-slate-500">A API não retornou ações sustentáveis ativas.</p></div>}

      {!loading && !error && actions.length > 0 && <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleActions.map(action => {
          const registration = getRegistration(action.codigo)
          const pending = registration?.status === pendingStatus
          const approved = registration?.status === approvedStatus
          return <article key={action.codigo} className="flex flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-forest">{categoryNames.get(action.codigoCategoria) ?? `Categoria ${action.codigoCategoria}`}</span>
              <span className="text-xl" aria-hidden="true">{approved ? '🏆' : '🌱'}</span>
            </div>
            <h3 className="mt-5 font-serif text-xl font-bold text-forest">{action.nome}</h3>
            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{action.descricao || 'Ação sustentável cadastrada pela equipe Soul Up.'}</p>
            <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>⭐ {action.pontosEcoa} Ecoa Points</span>
              {registration && <span>{registrationStatusLabels[registration.status] ?? registration.status}</span>}
            </div>
            <button
              type="button"
              onClick={() => void registerAction(action)}
              disabled={registeringCode === action.codigo || pending || approved || userCode === null}
              className="mt-5 rounded-xl bg-forest px-4 py-3 text-sm font-bold text-white transition hover:bg-clay disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registeringCode === action.codigo ? 'Registrando...' : approved ? 'Ação aprovada' : pending ? 'Aguardando aprovação' : userCode === null ? 'Carregue seu usuário' : 'Registrar participação'}
            </button>
          </article>
        })}
      </div>}
      {feedback && <p role="status" className="mt-5 rounded-xl bg-mint p-4 text-sm font-medium text-forest">{feedback}</p>}

      {userCode !== null && <section aria-labelledby="registration-history-title" className="mt-10">
        <h2 id="registration-history-title" className="font-serif text-2xl font-bold text-forest">Histórico de participações</h2>
        {registrations.length === 0
          ? <p className="mt-4 rounded-2xl border border-dashed border-forest/20 bg-white p-6 text-sm text-slate-600">Você ainda não registrou participações.</p>
          : <ul className="mt-4 space-y-3">
            {[...registrations].sort((left, right) => right.codigo - left.codigo).map(registration => (
              <li key={registration.codigo} className="flex flex-col gap-2 rounded-2xl border border-forest/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-forest">{getActionName(registration.codigoAcao)}</p>
                  <p className="mt-1 text-sm text-slate-500">{formatRegistrationDate(registration.dataRealizacao)}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-mint px-3 py-1 font-semibold text-forest">{registrationStatusLabels[registration.status] ?? registration.status}</span>
                  <span className="font-semibold text-slate-600">{registration.pontosGanhos ?? 0} pontos</span>
                </div>
              </li>
            ))}
          </ul>}
      </section>}

      <div className="mt-10 rounded-2xl border border-forest/10 bg-sand p-6 text-center">
        <p className="font-semibold text-forest">Uma atitude pode inspirar muitas outras.</p>
        <p className="mt-2 text-sm text-slate-600">Compartilhe sua experiência com a comunidade Soul Up.</p>
        <Link to="/comunidade" className="mt-4 inline-block rounded-xl bg-forest px-5 py-3 text-sm font-bold text-white hover:bg-clay">Compartilhar conquista →</Link>
      </div>
    </section>
  </>
}
