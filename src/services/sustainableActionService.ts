import type { ActionCategory, SustainableAction, UserActionRegistration } from '../types/domain'
import { request } from './http'

const ACTIONS_PATH = '/soulup/acao'
const CATEGORIES_PATH = '/soulup/categoria'
const REGISTRATIONS_PATH = '/soulup/registro-acao'

export const sustainableActionService = {
  async listCatalog(): Promise<{ actions: SustainableAction[]; categories: ActionCategory[] }> {
    const [actions, categories] = await Promise.all([
      request<SustainableAction[]>(ACTIONS_PATH),
      request<ActionCategory[]>(CATEGORIES_PATH),
    ])

    return { actions: actions.filter(action => action.ativo), categories }
  },

  listUserRegistrations(userCode: number): Promise<UserActionRegistration[]> {
    return request<UserActionRegistration[]>(`/soulup/usuario/${userCode}/acoes`)
  },

  register(userCode: number, actionCode: number): Promise<UserActionRegistration> {
    return request<UserActionRegistration>(REGISTRATIONS_PATH, {
      method: 'POST',
      body: JSON.stringify({ codigoUsuario: userCode, codigoAcao: actionCode }),
    })
  },
}
