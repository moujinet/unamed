export function useUser() {
  async function updateProfile(username: string, fullname: string) {
    const { code } = await useFetchAPI<null>('/api/user/profile', {
      method: 'patch',
      body: {
        username,
        fullname,
      },
    })

    return code.value === SUCCESS
  }

  async function changePassword(password: string, newPassword: string, newPasswordConfirm: string) {
    const { code } = await useFetchAPI<null>('/api/user/password', {
      method: 'patch',
      body: {
        password,
        newPassword,
        newPasswordConfirm,
      },
    })

    return code.value === SUCCESS
  }

  async function updateAvatar(avatar: string) {
    const { code } = await useFetchAPI<null>('/api/user/avatar', {
      method: 'patch',
      body: {
        avatar,
      },
    })

    return code.value === SUCCESS
  }

  return {
    updateProfile,
    changePassword,
    updateAvatar,
  }
}
