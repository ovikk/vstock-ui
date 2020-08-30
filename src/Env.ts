// yarn go-local
const localIp = 'localhost'

export const envs = {
  local: {
    server: `http://${localIp}:8899`,
  },
  prod: {
    server: 'https://api.trackstock.io',
  },
}

export default envs.prod
