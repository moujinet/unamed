import type { IUserModel } from '~/types'

type IUserProfile = Omit<IUserModel, 'password'>

interface IUserToken {
  token: string
}

export function useSession() {
  const error = ref('')

  const token = useSessionStorage<string>('token', '')
  const profile = useSessionStorage<IUserProfile>('profile', {} as IUserProfile)

  const isLoggedIn = computed(() => token.value !== '')
  const isAdmin = computed(() => profile.value?.is_admin ?? false)

  watch(() => isLoggedIn.value, async (loggedIn) => {
    if (loggedIn)
      refresh()
    else
      profile.value = {} as IUserProfile
  })

  async function login(username: string, password: string): Promise<boolean> {
    if (!_verifyUsername(username) || !_verifyPassword(password))
      return false

    const { code, data } = await useFetchAPI<IUserToken>('/api/user/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    })

    if (code.value === SUCCESS) {
      token.value = data.value?.token

      return true
    }

    return false
  }

  async function register(username: string, password: string, passwordConfirm: string): Promise<boolean> {
    if (!_verifyUsername(username) || !_verifyPassword(password, passwordConfirm))
      return false

    const { code } = await useFetchAPI('/api/user/register', {
      method: 'POST',
      body: {
        username,
        password,
        passwordConfirm,
      },
    })

    return code.value === SUCCESS
  }

  async function logout() {
    const { code } = await useFetchAPI('/api/user/logout', {
      method: 'POST',
    })

    if (code.value === SUCCESS) {
      clear()
      return navigateTo('/')
    }

    return false
  }

  async function refresh() {
    const { code, data } = await useFetchAPI<IUserProfile>('/api/user/profile', {
      headers: { Authorization: `Bearer ${token.value}` },
    })

    if (code.value === SUCCESS)
      profile.value = data.value

    else
      clear()
  }

  function clear() {
    token.value = ''
    profile.value = {} as IUserProfile
  }

  function _verifyUsername(username: string): boolean {
    error.value = ''

    if (!username || username.trim() === '') {
      error.value = 'Username is required'
      return false
    }

    if (username.length < 5) {
      error.value = 'Username must be at least 5 characters'
      return false
    }

    return true
  }

  function _verifyPassword(password: string, passwordConfirm: string = '_NONE_'): boolean {
    error.value = ''

    if (!password || !passwordConfirm) {
      error.value = 'Password is required'
      return false
    }

    if (password.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return false
    }

    if (passwordConfirm !== '_NONE_' && password !== passwordConfirm) {
      error.value = 'Passwords do not match'
      return false
    }

    return true
  }

  return {
    isLoggedIn,
    isAdmin,
    token,
    profile,
    error,
    login,
    register,
    logout,
    refresh,
    clear,
  }
}
