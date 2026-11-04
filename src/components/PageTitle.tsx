type PageTitleProps = { title: string; text: string }
export function PageTitle({ title, text }: PageTitleProps) {
  return <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b3b78] via-forest to-clay px-5 py-16 text-center text-white md:py-20">
    <div className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
    <p className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.16em] text-blue-50 backdrop-blur">SOUL UP</p>
    <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">{title}</h1>
    <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">{text}</p>
  </section>
}
