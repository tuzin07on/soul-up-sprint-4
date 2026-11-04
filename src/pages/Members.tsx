import arthurPhoto from '../assets/members/arthur.jpg'
import guilhermePhoto from '../assets/members/guilherme.jpg'
import jefersonPhoto from '../assets/members/jeferson.jpg'
import josuePhoto from '../assets/members/josue.png'
import { PageTitle } from '../components/PageTitle'
import type { TeamMember } from '../types/domain'

const members: TeamMember[] = [
  { name: 'Arthur Cordão', rm: 'RM 570313', className: '1TDSR', role: '🎯 Full Stack Developer', photo: arthurPhoto, github: 'https://github.com/tuzin07on', linkedin: 'https://www.linkedin.com/in/arthur-cord%C3%A3o-4bb94434b/' },
  { name: 'Jeferson Faria', rm: 'RM 573038', className: '1TDSR', role: '⚙️ Backend Developer', photo: jefersonPhoto, github: 'https://github.com/jeffersonfaria', linkedin: 'https://www.linkedin.com/in/jeffersonfaria-09b2b024b/' },
  { name: 'Guilherme Novaes', rm: 'RM 570444', className: '1TDSR', role: '🎨 UI/UX Designer', photo: guilhermePhoto, github: 'https://github.com/guilhermenovaes07-coder', linkedin: 'https://www.linkedin.com/in/guilherme-novaes-09b2b024b/' },
  { name: 'Josué Menezes', rm: 'RM 569220', className: '1TDSR', role: '📊 Data Analyst', photo: josuePhoto, github: 'https://github.com/josue-menezes', linkedin: 'https://www.linkedin.com/in/josu%C3%A9-menezes/' },
]

export function Members() {
  return <>
    <PageTitle title="Nosso Time" text="Turma 1TDSR — FIAP | Global Solution 2026/1" />
    <section className="mx-auto max-w-6xl px-5 py-16"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{members.map(member => <article key={member.rm} className="overflow-hidden rounded-2xl border border-forest/10 bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10"><img src={member.photo} alt={`Foto de ${member.name}`} className="h-60 w-full object-cover object-top" /><div className="p-6"><h2 className="font-serif text-2xl font-bold text-forest">{member.name}</h2><p className="mt-1 text-sm text-slate-500">{member.rm} · {member.className}</p><p className="mt-4 min-h-12 text-sm font-semibold text-slate-700">{member.role}</p><div className="mt-5 flex justify-center gap-4 text-sm font-bold"><a className="text-forest underline underline-offset-4" href={member.github} target="_blank" rel="noreferrer">GitHub</a><a className="text-clay underline underline-offset-4" href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div></article>)}</div></section>
  </>
}
