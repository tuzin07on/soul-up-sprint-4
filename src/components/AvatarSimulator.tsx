import { useState } from 'react'
import { avatarItems, avatarLevels, avatarMissions } from '../data/avatar'
import type { AvatarItem, AvatarMission, AvatarMood, AvatarProgress, AvatarState } from '../types/avatar'
import { AvatarFigure } from './AvatarFigure'

const initialState: AvatarState = { name: 'Meu Avatar', points: 0, totalEarned: 0, owned: [], equipped: {} }

/** Descobre o nível pelo total de pontos ganhos (comprar itens não faz o avatar regredir). */
function getProgress(totalEarned: number): AvatarProgress {
  const index = avatarLevels.findLastIndex(level => totalEarned >= level.minPoints)
  const current = avatarLevels[index]
  const next = avatarLevels[index + 1] ?? null
  const percent = next ? Math.round(((totalEarned - current.minPoints) / (next.minPoints - current.minPoints)) * 100) : 100
  return { ...current, next, percent }
}

export function AvatarSimulator() {
  const [avatar, setAvatar] = useState<AvatarState>(initialState)
  const [message, setMessage] = useState('Complete uma missão para ganhar seus primeiros Ecoa Points.')
  const [celebrating, setCelebrating] = useState(false)

  const progress = getProgress(avatar.totalEarned)
  const mood: AvatarMood = celebrating ? 'radiante' : avatar.totalEarned > 0 ? 'feliz' : 'neutro'

  function completeMission(mission: AvatarMission) {
    const before = getProgress(avatar.totalEarned).level
    const after = getProgress(avatar.totalEarned + mission.points)
    setAvatar(current => ({ ...current, points: current.points + mission.points, totalEarned: current.totalEarned + mission.points }))
    if (after.level > before) {
      setMessage(`🎉 Subiu de nível! Agora seu avatar é ${after.icon} ${after.name}.`)
      setCelebrating(true)
      window.setTimeout(() => setCelebrating(false), 1600)
    } else {
      setMessage(`${mission.icon} +${mission.points} Ecoa Points por "${mission.title}".`)
    }
  }

  function handleItem(item: AvatarItem) {
    const owned = avatar.owned.includes(item.id)
    if (!owned) {
      if (avatar.points < item.price) {
        setMessage(`Faltam ${item.price - avatar.points} pontos para comprar ${item.name}.`)
        return
      }
      setAvatar(current => ({ ...current, points: current.points - item.price, owned: [...current.owned, item.id], equipped: { ...current.equipped, [item.slot]: item.id } }))
      setMessage(`🛍️ ${item.name} comprado e equipado!`)
      return
    }
    const isEquipped = avatar.equipped[item.slot] === item.id
    setAvatar(current => {
      const equipped = { ...current.equipped }
      if (isEquipped) delete equipped[item.slot]
      else equipped[item.slot] = item.id
      return { ...current, equipped }
    })
    setMessage(isEquipped ? `${item.name} guardado no inventário.` : `${item.name} equipado.`)
  }

  function reset() {
    setAvatar(initialState)
    setMessage('Simulação reiniciada. Bora começar de novo? 🌱')
  }

  return <section aria-labelledby="simulador-titulo" className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />

    <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.15fr]">
      <div className="flex flex-col items-center rounded-3xl bg-gradient-to-b from-blue-50 to-white p-6">
        <span className="rounded-full bg-forest px-3 py-1 text-xs font-bold tracking-[0.14em] text-white">SIMULAÇÃO INTERATIVA</span>
        <div className={`mt-4 h-72 w-60 transition-transform duration-500 ${celebrating ? 'scale-110' : 'scale-100 animate-flutuar'}`}>
          <AvatarFigure aura={progress.aura} level={progress.level} mood={mood} equipped={avatar.equipped} />
        </div>
        <input
          value={avatar.name}
          onChange={event => setAvatar(current => ({ ...current, name: event.target.value.slice(0, 20) }))}
          aria-label="Nome do avatar"
          className="mt-2 w-56 rounded-xl border border-transparent bg-transparent text-center font-serif text-2xl font-bold text-forest outline-none hover:border-blue-100 focus:border-clay focus:bg-white"
        />
        <p className="mt-1 text-sm font-semibold text-clay">{progress.icon} Nível {progress.level} · {progress.name}</p>
        <div className="mt-5 w-full max-w-xs">
          <div className="h-3 overflow-hidden rounded-full bg-blue-100">
            <div className="h-full rounded-full bg-gradient-to-r from-clay to-sky-400 transition-all duration-700" style={{ width: `${progress.percent}%` }} />
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">{progress.next ? `${avatar.totalEarned} / ${progress.next.minPoints} pts para ${progress.next.icon} ${progress.next.name}` : 'Nível máximo alcançado!'}</p>
        </div>
        <div className="mt-5 grid w-full max-w-xs grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-white p-3 shadow-sm"><p className="text-2xl font-bold text-forest">{avatar.points}</p><p className="text-xs text-slate-500">Ecoa Points</p></div>
          <div className="rounded-2xl bg-white p-3 shadow-sm"><p className="text-2xl font-bold text-forest">{avatar.owned.length}/{avatarItems.length}</p><p className="text-xs text-slate-500">Itens</p></div>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-clay">EXPERIMENTE A SOUL UP</p>
          <h2 id="simulador-titulo" className="mt-2 font-serif text-3xl font-bold text-forest md:text-4xl">Simule a evolução do seu avatar</h2>
          <p className="mt-3 leading-7 text-slate-600">Complete missões, acumule Ecoa Points, suba de nível e compre roupas sustentáveis para personalizar seu personagem.</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-700">1. Complete missões</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {avatarMissions.map(mission => <button key={mission.id} type="button" onClick={() => completeMission(mission)} className="group flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-clay hover:shadow-lg hover:shadow-blue-900/10 active:scale-[0.98]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint text-xl transition group-hover:scale-110">{mission.icon}</span>
              <span className="flex-1 text-sm font-semibold text-slate-700">{mission.title}</span>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-clay">+{mission.points}</span>
            </button>)}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-700">2. Personalize na loja</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {avatarItems.map(item => {
              const owned = avatar.owned.includes(item.id)
              const equipped = avatar.equipped[item.slot] === item.id
              const affordable = avatar.points >= item.price
              return <button key={item.id} type="button" onClick={() => handleItem(item)} aria-pressed={equipped} className={`rounded-2xl border p-3 text-center transition hover:-translate-y-0.5 active:scale-[0.98] ${equipped ? 'border-clay bg-blue-50 ring-2 ring-clay/30' : 'border-blue-100 bg-white hover:border-clay'} ${!owned && !affordable ? 'opacity-60' : ''}`}>
                <span className="text-2xl">{item.icon}</span>
                <p className="mt-1 text-xs font-bold text-slate-700">{item.name}</p>
                <p className={`mt-1 text-xs font-semibold ${equipped ? 'text-clay' : owned ? 'text-emerald-600' : 'text-slate-500'}`}>{equipped ? 'Equipado ✓' : owned ? 'Equipar' : `${item.price} pts`}</p>
              </button>
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p role="status" aria-live="polite" className="flex-1 rounded-2xl bg-mint/70 px-4 py-3 text-sm font-medium text-forest">{message}</p>
          <button type="button" onClick={reset} className="rounded-xl border border-forest/20 px-4 py-3 text-sm font-bold text-forest transition hover:bg-blue-50">Reiniciar</button>
        </div>
      </div>
    </div>
  </section>
}
