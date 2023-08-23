export function useModalRegister() {
  const registered = useState<string[]>('modal.registered', () => [])

  return {
    each: (cb: (name: string) => void) => {
      registered.value.forEach((name) => {
        cb(name)
      })
    },
    has: (name: string) => {
      return registered.value.includes(name)
    },
    push: (name: string) => {
      if (!registered.value.includes(name))
        registered.value.push(name)
    },
  }
}

/**
 * Use a modal
 *
 * const loginModal = useModal('login')
 * loginModal = true
 *
 * @param name string
 */
export function useModal(name: string) {
  const register = useModalRegister()
  const modal = register.has(name) ? useState<boolean>(name) : useState<boolean>(name, () => false)

  register.push(name)

  return computed({
    get() {
      return modal.value
    },
    set(value) {
      modal.value = value

      value === true && register.each((n) => {
        if (name !== n) {
          const other = useState<boolean>(n)
          other.value = false
        }
      })
    },
  })
}
