type PageTitleProps = { title: string; text: string }
export function PageTitle({ title, text }: PageTitleProps) {
  return <section className="border-b border-forest/10 bg-blue-50 px-5 py-16 text-center"><p className="text-xs font-bold tracking-[0.16em] text-clay">Soul Up</p><h1 className="mt-3 font-serif text-4xl font-bold text-forest md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">{text}</p></section>
}
