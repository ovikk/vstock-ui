// yarn go-local
const localIp = 'localhost'

export const envs = {
  local: {
    server: `http://${localIp}:8899`,
  },
  prod: {
    server: 'http://46.101.99.145:8080',
  },
}

export default envs.prod
