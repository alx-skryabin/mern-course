import {useCallback} from 'react'

// hook - message display
export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
      window.M.toast({
        html: text
      })
    }
  }, [])
}
