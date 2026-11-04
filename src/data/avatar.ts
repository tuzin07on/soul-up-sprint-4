import type { AvatarItem, AvatarLevel, AvatarMission } from '../types/avatar'

export const avatarLevels: AvatarLevel[] = [
  { level: 1, name: 'Semente', icon: '🌱', minPoints: 0, aura: '#93c5fd' },
  { level: 2, name: 'Broto', icon: '🌿', minPoints: 100, aura: '#60a5fa' },
  { level: 3, name: 'Árvore', icon: '🌳', minPoints: 300, aura: '#3b82f6' },
  { level: 4, name: 'Floresta', icon: '🌲', minPoints: 600, aura: '#1d4ed8' },
  { level: 5, name: 'Guardião da Terra', icon: '🌍', minPoints: 1000, aura: '#1e3a8a' },
]

export const avatarMissions: AvatarMission[] = [
  { id: 'reciclar', title: 'Reciclar 1 kg de plástico', icon: '♻️', points: 50 },
  { id: 'bike', title: 'Ir de bicicleta ao trabalho', icon: '🚲', points: 40 },
  { id: 'agua', title: 'Banho de 5 minutos', icon: '💧', points: 20 },
  { id: 'arvore', title: 'Plantar uma árvore', icon: '🌳', points: 120 },
]

export const avatarItems: AvatarItem[] = [
  { id: 'chapeu', name: 'Chapéu de Folhas', icon: '🍃', price: 80, slot: 'cabeca' },
  { id: 'oculos', name: 'Óculos de Folha', icon: '🌿', price: 60, slot: 'rosto' },
  { id: 'capa', name: 'Capa de Reciclagem', icon: '♻️', price: 150, slot: 'costas' },
  { id: 'mochila', name: 'Mochila Solar', icon: '☀️', price: 120, slot: 'costas' },
  { id: 'botas', name: 'Botas de Bambu', icon: '🎍', price: 90, slot: 'pes' },
]
