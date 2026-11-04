import { Link } from 'react-router-dom'

export function Footer() {
  return <footer className="mt-16 bg-[#0b3b78] px-5 py-12 text-blue-50">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm md:flex-row md:items-end md:justify-between">
      <div><p className="font-serif text-xl font-bold tracking-[0.12em]">Soul Up</p><p className="mt-2 max-w-sm text-blue-100">Conectando pessoas e tecnologia para transformar pequenas atitudes em impacto coletivo.</p></div>
      <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-5 gap-y-2 text-blue-100"><Link to="/solucao">Solução</Link><Link to="/desafios">Desafios</Link><Link to="/comunidade">Comunidade</Link><Link to="/contato">Contato</Link><Link to="/integrantes">Equipe</Link></nav>
      <p className="text-blue-100">© {new Date().getFullYear()} Soul Up. Todos os direitos reservados.</p>
    </div>
  </footer>
}
