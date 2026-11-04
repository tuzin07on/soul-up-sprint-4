import type { AvatarItemId, AvatarMood, AvatarSlot } from '../types/avatar'

type AvatarFigureProps = {
  aura: string
  level: number
  mood: AvatarMood
  equipped: Partial<Record<AvatarSlot, AvatarItemId>>
}

/** Desenho do avatar em SVG. Cada item equipado é uma camada sobre o corpo. */
export function AvatarFigure({ aura, level, mood, equipped }: AvatarFigureProps) {
  const wearing = (id: AvatarItemId) => Object.values(equipped).includes(id)
  const sprouts = Math.min(level, 5)

  return <svg viewBox="0 0 240 280" role="img" aria-label="Avatar Soul Up" className="h-full w-full drop-shadow-[0_20px_30px_rgba(18,78,154,0.25)]">
    <defs>
      <radialGradient id="aura" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor={aura} stopOpacity="0.55" />
        <stop offset="100%" stopColor={aura} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="corpo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="solar" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>

    <circle cx="120" cy="130" r="118" fill="url(#aura)" className="transition-all duration-700" />
    <ellipse cx="120" cy="262" rx="62" ry="9" fill="#124e9a" opacity="0.12" />

    {wearing('capa') && <path d="M78 128 Q120 112 162 128 L182 236 Q120 250 58 236 Z" fill="#16a34a" opacity="0.9" />}
    {wearing('capa') && <text x="120" y="215" textAnchor="middle" fontSize="26">♻️</text>}
    {wearing('mochila') && <g>
      <rect x="60" y="138" width="34" height="58" rx="9" fill="#1e293b" />
      <rect x="56" y="128" width="42" height="16" rx="3" fill="url(#solar)" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M63 136 H91 M77 128 V144" stroke="#e2e8f0" strokeWidth="1" />
    </g>}

    <path d="M84 132 Q120 118 156 132 L164 214 Q120 226 76 214 Z" fill="url(#corpo)" />
    <rect x="100" y="214" width="15" height="34" rx="7" fill="#1e3a8a" />
    <rect x="125" y="214" width="15" height="34" rx="7" fill="#1e3a8a" />
    {wearing('botas')
      ? <g fill="#a3e635" stroke="#4d7c0f" strokeWidth="2"><rect x="94" y="240" width="24" height="16" rx="6" /><rect x="122" y="240" width="24" height="16" rx="6" /><path d="M98 246 H114 M126 246 H142" /></g>
      : <g fill="#0f172a"><rect x="96" y="242" width="22" height="13" rx="6" /><rect x="122" y="242" width="22" height="13" rx="6" /></g>}
    <rect x="66" y="140" width="16" height="56" rx="8" fill="#2563eb" transform={mood === 'radiante' ? 'rotate(28 74 140)' : ''} className="transition-transform duration-500" />
    <rect x="158" y="140" width="16" height="56" rx="8" fill="#2563eb" transform={mood === 'radiante' ? 'rotate(-28 166 140)' : ''} className="transition-transform duration-500" />

    <circle cx="120" cy="86" r="44" fill="#fde2c8" />
    <path d="M78 78 Q84 40 120 40 Q158 40 162 78 Q146 60 120 62 Q96 60 78 78 Z" fill="#3f2a1e" />
    {Array.from({ length: wearing('chapeu') ? 0 : sprouts }, (_, i) => <path key={i} d={`M${102 + i * 9} 44 q-6 -14 4 -20 q4 10 -4 20`} fill="#22c55e" />)}

    {wearing('oculos')
      ? <g><ellipse cx="103" cy="88" rx="13" ry="9" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" /><ellipse cx="137" cy="88" rx="13" ry="9" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" /><path d="M116 88 H124" stroke="#15803d" strokeWidth="3" /><circle cx="103" cy="88" r="3" fill="#0f172a" /><circle cx="137" cy="88" r="3" fill="#0f172a" /></g>
      : <g fill="#0f172a"><circle cx="103" cy="88" r="4.5" /><circle cx="137" cy="88" r="4.5" /></g>}
    <circle cx="94" cy="102" r="6" fill="#fca5a5" opacity="0.6" />
    <circle cx="146" cy="102" r="6" fill="#fca5a5" opacity="0.6" />
    {mood === 'neutro' && <path d="M110 108 H130" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />}
    {mood === 'feliz' && <path d="M108 106 Q120 116 132 106" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />}
    {mood === 'radiante' && <path d="M106 104 Q120 122 134 104 Z" fill="#0f172a" />}

    {wearing('chapeu') && <g>
      <ellipse cx="120" cy="50" rx="52" ry="11" fill="#15803d" />
      <path d="M90 50 Q92 18 120 16 Q148 18 150 50 Z" fill="#22c55e" />
      <path d="M120 16 V50 M104 22 L110 50 M136 22 L130 50" stroke="#15803d" strokeWidth="2" />
    </g>}

    {level >= 5 && <g fill="#facc15"><path d="M38 60 l4 9 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" /><path d="M196 44 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" /></g>}
  </svg>
}
