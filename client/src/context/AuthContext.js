import {createContext} from 'react'

function noop() {
}

// To pass the context across the application
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
