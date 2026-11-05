import { Link } from 'react-router-dom'
import arthurPhoto from '../assets/members/arthur.jpg'
import guilhermePhoto from '../assets/members/guilherme.jpg'
import jefersonPhoto from '../assets/members/jeferson.jpg'
import josuePhoto from '../assets/members/josue.png'

const values = [
  ['💡', 'Inovação', 'Criamos ideias inovadoras para resolver desafios.'],
  ['🤝', 'Colaboração', 'Trabalho em equipe focado em resultados.'],
  ['💻', 'Tecnologia', 'Ferramentas modernas para criar soluções.'],
  ['🌎', 'Impacto Social', 'Melhorando vidas através da tecnologia.'],
]

const members = [
  ['Arthur Cordão', arthurPhoto],
  ['Guilherme Novaes', guilhermePhoto],
  ['Jeferson Faria', jefersonPhoto],
  ['Josué Menezes', josuePhoto],
]

export function Home() {
  return <>
    <title>Soul Up — Conexões que transformam</title>
    <section className="relative isolate overflow-hidden px-5 pb-28 pt-24 md:pb-36 md:pt-32" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85)', backgroundPosition: 'center', backgroundSize: 'cover' }}><div className="absolute inset-0 -z-10 bg-[#063b78]/80" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#062f61]/90 via-[#0b5798]/65 to-[#1769d1]/45" /><div className="relative mx-auto max-w-6xl text-white"><p className="text-sm font-bold tracking-[0.18em] text-blue-100">SOUL UP</p><h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold leading-[1.04] tracking-tight md:text-7xl">Conectando mentes,<br /><span className="text-blue-100">criando soluções,</span><br />transformando vidas.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50">A Soul Up nasceu para unir pessoas e tecnologia em prol de soluções reais.</p><div className="mt-9 flex flex-wrap gap-3"><Link to="/sobre" className="rounded-xl bg-white px-6 py-3.5 font-bold text-forest shadow-xl transition hover:-translate-y-1">Conheça o projeto →</Link><Link to="/solucao" className="rounded-xl border border-white/60 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-forest">Ver solução</Link></div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-14"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map(([icon, title, text]) => <article key={title} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"><span className="text-3xl">{icon}</span><h2 className="mt-4 font-serif text-xl font-bold text-forest">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><div className="grid items-center gap-10 md:grid-cols-2"><div><p className="text-sm font-bold tracking-[0.16em] text-clay">SOBRE NÓS</p><h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-forest">Por que a Soul Up existe?</h2><p className="mt-5 max-w-xl leading-8 text-slate-600">Nosso propósito é aproximar pessoas e resolver problemas através da tecnologia. Queremos criar uma comunidade ativa, acessível e capaz de transformar boas ideias em impacto.</p><div className="mt-8 grid grid-cols-3 gap-3"><Metric value="100+" text="Horas de dedicação" /><Metric value="10" text="Tecnologias" /><Metric value="1" text="Objetivo" /></div></div><img src="/about-team.jpg" alt="Pessoas colaborando em uma mesa" loading="lazy" className="h-96 w-full rounded-[2rem] object-cover object-center shadow-lg" /></div></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><div className="grid items-center gap-10 md:grid-cols-2"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85" alt="Pessoa utilizando tecnologia para colaborar" className="h-80 w-full rounded-[2rem] object-cover shadow-lg" /><div><p className="text-sm font-bold tracking-[0.16em] text-clay">CONHEÇA NOSSA SOLUÇÃO</p><h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-forest">Uma plataforma para conectar pessoas e promover impacto.</h2><p className="mt-5 leading-8 text-slate-600">A Soul Up une comunidade, tecnologia e aprendizado contínuo para incentivar ações sustentáveis de forma simples e gamificada.</p><ul className="mt-6 grid gap-3 text-sm font-semibold text-forest sm:grid-cols-2"><li>✓ Interface simples</li><li>✓ Comunidade ativa</li><li>✓ Recursos inteligentes</li><li>✓ Aprendizado contínuo</li></ul><Link to="/solucao" className="mt-7 inline-block rounded-xl bg-forest px-6 py-3.5 font-bold text-white transition hover:-translate-y-1">Conhecer a solução →</Link></div></div></section>

    <section className="mx-auto max-w-6xl px-5 py-16"><div className="text-center"><p className="text-sm font-bold tracking-[0.16em] text-clay">NOSSO TIME</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest">Pessoas por trás da Soul Up.</h2></div><div className="mt-9 grid grid-cols-2 gap-5 md:grid-cols-4">{members.map(([name, photo]) => <article key={name} className="text-center"><img src={photo} alt={`Foto de ${name}`} className="mx-auto h-40 w-40 rounded-2xl object-cover object-top shadow-md" /><h3 className="mt-4 font-serif text-lg font-bold text-forest">{name}</h3><p className="mt-1 text-sm text-slate-500">Turma 1TDSR</p></article>)}</div><div className="mt-8 text-center"><Link to="/integrantes" className="font-bold text-clay underline underline-offset-4">Conheça todos os integrantes →</Link></div></section>

    <section className="mx-auto max-w-4xl px-5 py-16"><div className="rounded-[2rem] bg-forest p-8 text-white md:p-12"><p className="text-sm font-bold tracking-[0.16em] text-blue-100">PERGUNTAS FREQUENTES</p><h2 className="mt-3 font-serif text-4xl font-bold">Dúvidas sobre a Soul Up?</h2><p className="mt-4 max-w-xl leading-7 text-blue-100">Descubra o que é a plataforma, quem pode participar e como funcionam as ações da comunidade.</p><Link to="/faq" className="mt-7 inline-block rounded-xl bg-white px-6 py-3.5 font-bold text-forest transition hover:-translate-y-1">Ver perguntas frequentes →</Link></div></section>
  </>
}

function Metric({ value, text }: { value: string; text: string }) { return <div><p className="font-serif text-3xl font-bold text-forest">{value}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div> }
