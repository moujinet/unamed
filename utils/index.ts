import dayjs from 'dayjs'

export function useData<T>(data: MaybeRef<T | undefined>, defaultValue: T): T {
  return isRef(data)
    ? data.value ? data.value : defaultValue
    : data || defaultValue
}

export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format)
}
