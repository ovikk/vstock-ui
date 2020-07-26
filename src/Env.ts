// yarn go-local
const localIp = 'localhost'

export const envs = {
  local: {
    server: `http://${localIp}:8899`,
  },
  prod: {
    // server: 'https://neverthink.tv',
  },
}

export default envs.local
