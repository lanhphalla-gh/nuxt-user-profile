export const useApi = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBaseUrl as string,
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
}