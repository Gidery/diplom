export interface AuthState {
  token: string
  user: any //todo
  status: "loading" | 'success' | 'error' | 'empty'
}

export const authStorage = () => {
  const authKey = 'auth'
  const initialAuthState: AuthState = {
    token: '',
    user: null,
    status: 'empty',
  }

  const setInitialAuthState = () => {
    const authState = localStorage.getItem(authKey)
    if (authState === null) {
      localStorage.setItem(authKey, JSON.stringify(initialAuthState))
      return JSON.parse(localStorage.getItem(authKey))
    }
    return JSON.parse(authState)
  }

  const changeAuthState = (newState: AuthState) => localStorage.setItem(authKey, JSON.stringify(newState))
  const clearAuthState = () => localStorage.setItem(authKey, JSON.stringify(initialAuthState))

  return {authState: setInitialAuthState(), changeAuthState, clearAuthState}
}