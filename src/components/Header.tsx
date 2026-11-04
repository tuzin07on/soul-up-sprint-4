import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  ['/', 'Início'], ['/sobre', 'Sobre'], ['/solucao', 'Solução'],
  ['/desafios', 'Desafios'], ['/comunidade', 'Comunidade'],
  ['/faq', 'FAQ'], ['/integrantes', 'Integrantes'], ['/contato', 'Contato'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 shadow-sm shadow-blue-900/5 backdrop-blur-xl">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-5 py-4">
      <Link to="/" onClick={closeMenu} className="flex items-center gap-2 font-serif text-2xl font-bold tracking-[0.1em] text-forest" aria-label="Soul Up — página inicial"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-forest to-clay font-sans text-sm text-white shadow-md shadow-blue-900/20">S</span>Soul Up</Link>
      <button type="button" onClick={() => setOpen(current => !current)} className="rounded-full border border-forest/30 px-4 py-2 text-sm font-semibold text-forest md:hidden" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation">{open ? 'Fechar' : 'Menu'}</button>
      <nav id="main-navigation" aria-label="Navegação principal" className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 pt-4 text-sm font-medium md:flex md:w-auto md:flex-row md:items-center md:gap-1 md:pt-0`}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={closeMenu} className={({ isActive }) => `rounded-full px-3 py-2 transition ${isActive ? 'bg-forest font-bold text-white shadow-md shadow-blue-900/20' : 'text-slate-600 hover:bg-blue-50 hover:text-forest'}`}>{label}</NavLink>)}
      </nav>
    </div>
  </header>
}
