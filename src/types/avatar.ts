export type AvatarItemId = 'chapeu' | 'oculos' | 'capa' | 'mochila' | 'botas'
export type AvatarSlot = 'cabeca' | 'rosto' | 'costas' | 'pes'
export type AvatarMood = 'neutro' | 'feliz' | 'radiante'

export interface AvatarLevel {
  level: number
  name: string
  icon: string
  minPoints: number
  aura: string
}

export interface AvatarMission {
  id: string
  title: string
  icon: string
  points: number
}

export interface AvatarItem {
  id: AvatarItemId
  name: string
  icon: string
  price: number
  slot: AvatarSlot
}

/** Estado do avatar na simulação: o que o usuário tem e o que está vestindo. */
export interface AvatarState {
  name: string
  points: number
  totalEarned: number
  owned: AvatarItemId[]
  equipped: Partial<Record<AvatarSlot, AvatarItemId>>
}

export type AvatarProgress = AvatarLevel & { next: AvatarLevel | null; percent: number }
