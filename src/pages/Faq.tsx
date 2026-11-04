import { useState } from 'react'
import { PageTitle } from '../components/PageTitle'

const questions = [
  ['O que é Soul Up?', 'A Soul Up é uma plataforma que conecta pessoas interessadas em compartilhar conhecimento e colaborar em projetos sustentáveis.'],
  ['Quem pode participar?', 'Qualquer pessoa interessada em sustentabilidade, colaboração e impacto positivo pode participar da comunidade.'],
  ['É gratuito?', 'Sim. A proposta é oferecer uma experiência acessível para que mais pessoas possam aprender e agir juntas.'],
  ['Como funciona?', 'Você participa de desafios, registra ações sustentáveis, ganha moedas e evolui seu personagem enquanto inspira outras pessoas.'],
]

export function Faq() {
  const [active, setActive] = useState<number | null>(null)
  return <><PageTitle title="Perguntas frequentes" text="Dúvidas mais comuns sobre a Soul Up." /><section className="mx-auto max-w-3xl px-5 py-16"><p className="mb-5 text-center text-sm text-slate-500">Clique em uma pergunta para ver a resposta.</p>{questions.map(([question, answer], index) => <article key={question} className={`mb-4 overflow-hidden rounded-2xl border bg-white transition ${active === index ? 'border-forest/25 shadow-lg shadow-forest/5' : 'border-forest/10 shadow-sm'}`}><button className="flex w-full items-center justify-between gap-6 p-6 text-left font-serif text-xl font-bold text-forest" onClick={() => setActive(active === index ? null : index)} aria-expanded={active === index}><span>{question}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint font-sans transition ${active === index ? 'rotate-45' : ''}`}>+</span></button>{active === index && <p className="border-t border-forest/10 px-6 py-5 leading-7 text-slate-600">{answer}</p>}</article>)}</section></>
}
