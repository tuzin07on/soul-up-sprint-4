import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { solutions } from '../data/solutions'

const characterImage = 'https://tuzin07on.github.io/Sprint/img/pagina_solucao.png'

export function Solution() {
  return <>
    <PageTitle title="Nossa solução" text="Conectando pessoas através da tecnologia para criar ações sustentáveis." />
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div><p className="text-sm font-bold tracking-[0.15em] text-clay">O DESAFIO ENCONTRADO</p><h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-forest">Sustentabilidade também precisa de conexão.</h2><p className="mt-5 leading-8 text-slate-600">Muitas pessoas têm dificuldade para encontrar formas de praticar sustentabilidade. O principal desafio é a falta de uma plataforma que conecte pessoas interessadas em compartilhar conhecimento e colaborar em projetos sustentáveis.</p></div>
        <div className="rounded-[2rem] bg-mint p-8"><p className="font-serif text-6xl text-forest">“</p><p className="mt-2 font-serif text-2xl font-bold leading-9 text-forest">Quando uma pessoa age, ela muda um lugar. Quando uma comunidade age, ela muda o futuro.</p></div>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-3"><Problem icon="📌" title="Falta de conexão" text="Dificuldade de aproximar pessoas e compartilhar conhecimento." /><Problem icon="📌" title="Acesso limitado" text="Poucas plataformas acessíveis e intuitivas para participar." /><Problem icon="📌" title="Falta de incentivo" text="Baixa interação entre usuários e pouca motivação para continuar." /></div>
      <div className="mt-16 overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-sm"><img src={characterImage} alt="Personagem da solução Soul Up" className="h-72 w-full object-cover object-center md:h-96" /></div>
      <div className="mt-20 max-w-3xl"><p className="text-sm font-bold tracking-[0.15em] text-clay">COMO RESOLVEMOS ISSO?</p><h2 className="mt-3 font-serif text-4xl font-bold text-forest">Uma plataforma que transforma ação em evolução.</h2><p className="mt-5 leading-8 text-slate-600">A Soul Up conecta pessoas com métodos interessantes e gamificados para realizar ações sustentáveis. Ao postar uma ação ou finalizar um desafio, a pessoa ganha moedas que podem ser trocadas por roupas para um personagem. A cada nova conquista, o personagem evolui e o progresso pode ser compartilhado para incentivar outras pessoas.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{solutions.map(solution => <article key={solution.id} className="rounded-2xl border border-forest/10 bg-white p-7 shadow-sm"><span className="text-4xl">{solution.icon}</span><h3 className="mt-5 font-serif text-2xl font-bold text-forest">{solution.title}</h3><p className="mt-3 leading-7 text-slate-600">{solution.summary}</p><Link to={`/solucao/${solution.id}`} className="mt-5 inline-block font-bold text-clay underline underline-offset-4">Ver detalhes →</Link></article>)}</div>
    </section>
  </>
}

function Problem({ icon, title, text }: { icon: string; title: string; text: string }) { return <article className="rounded-2xl border border-forest/10 bg-white p-7 shadow-sm"><span className="text-2xl">{icon}</span><h3 className="mt-4 font-serif text-2xl font-bold text-forest">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article> }
