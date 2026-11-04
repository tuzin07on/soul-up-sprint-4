import { Link } from 'react-router-dom'
type ProjectCardProps = { id: string; title: string; text: string; icon: string }
export function ProjectCard({ id, title, text, icon }: ProjectCardProps) {
  return <article className="group rounded-2xl border border-forest/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10"><span className="grid h-12 w-12 place-items-center rounded-full bg-mint text-2xl">{icon}</span><h3 className="mt-5 font-serif text-2xl font-bold text-forest">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p><Link className="mt-6 inline-block font-bold text-clay transition group-hover:translate-x-1" to={`/solucao/${id}`}>Ver detalhes →</Link></article>
}
