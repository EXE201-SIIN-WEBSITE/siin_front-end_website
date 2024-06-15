import { useEffect } from 'react'

export default function useKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) action()
    }
    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [action, key])
}
// truyền vào key và action, nếu key được nhấn thì thực hiện action
//(action là một hàm callback, key: ví dụ như 'Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'...)
