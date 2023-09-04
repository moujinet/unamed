export interface IToast {
  id?: string
  icon?: string
  iconClass?: string
  title?: string
  titleClass?: string
  description?: string
  timeout?: number
  delay?: number
  afterAction?: () => void
  afterTimeout?: () => void
}

export function useToast() {
  const toasts = useState<IToast[]>('toasts', () => ([]))

  function add(opts: IToast) {
    onHydrated(() => {
      const toast = {
        id: `toast-${toasts.value.length + 1}`,
        timeout: 5000,
        delay: 200,
        ...opts,
      }

      if (toast.description && toasts.value.filter(t => t.description === toast.description).length > 0)
        return

      toasts.value.push(toast)

      setTimeout(() => {
        if (toast.afterAction)
          toast.afterAction()
      }, toast.delay)

      setTimeout(() => {
        if (toast.afterTimeout)
          toast.afterTimeout()

        toasts.value.splice(toasts.value.indexOf(toast), 1)
      }, toast.timeout)
    })
  }

  function info(toast: IToast) {
    add({
      titleClass: 'text-caption',
      icon: 'ph:warning-circle',
      iconClass: 'text-primary',
      ...toast,
    })
  }

  function success(toast: IToast) {
    add({
      title: 'Success',
      titleClass: 'text-primary',
      icon: 'ph:check-circle',
      iconClass: 'text-primary',
      ...toast,
    })
  }

  function error(toast: IToast) {
    add({
      title: 'Error',
      titleClass: 'text-danger',
      icon: 'ph:x-circle',
      iconClass: 'text-danger',
      ...toast,
    })
  }

  return {
    add,
    info,
    success,
    error,
  }
}
