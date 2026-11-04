import { Link, useParams } from 'react-router-dom'
import { solutions } from '../data/solutions'

export function SolutionDetails() {
  const { id } = useParams<{ id: string }>()
  const solution = solutions.find(item => item.id === id)
  if (!solution) return <section className="mx-auto max-w-3xl px-5 py-24 text-center"><span className="text-6xl">🌱</span><h1 className="mt-5 font-serif text-4xl font-bold text-forest">Solução não encontrada</h1><Link className="mt-6 inline-block rounded-full bg-forest px-5 py-3 font-bold text-white" to="/solucao">Voltar para soluções</Link></section>
  return <section className="mx-auto max-w-3xl px-5 py-16"><Link className="inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:-translate-x-1" to="/solucao">← Voltar para soluções</Link><div className="mt-8 overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-xl shadow-forest/5"><div className="bg-mint p-8 md:p-10"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-4xl shadow-sm">{solution.icon}</span><h1 className="mt-6 font-serif text-4xl font-bold text-forest">{solution.title}</h1><p className="mt-4 max-w-xl leading-7 text-slate-600">{solution.description}</p></div><div className="p-8 md:p-10"><h2 className="font-serif text-2xl font-bold text-forest">Benefícios esperados</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{solution.benefits.map(benefit => <li key={benefit} className="rounded-xl bg-sand p-4 text-slate-700"><span className="mr-2 font-bold text-clay">✓</span>{benefit}</li>)}</ul></div></div></section>
}
