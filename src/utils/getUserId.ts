import { CallableContext } from 'firebase-functions/lib/providers/https'

export const getUserId = (context: CallableContext): string | null => {
  return context.auth ? context.auth.uid : null
}
