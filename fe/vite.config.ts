import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'



export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  let envPort: number | undefined = undefined;
  if (env.FE_PORT !== undefined) {
    const envPortMaybe = parseInt(env.FE_PORT);
    if (!isNaN(envPortMaybe)) {
      envPort = envPortMaybe;
    }
  }

  const port = envPort === undefined ? 5173 : envPort;

  const hostname = env.FE_HOSTNAME ?? 'localhost';
  console.log(hostname);

  return {
    server: {
      port: port,
      strictPort: true,
      host: hostname,
    },
    plugins: [ react() ],
  };
})
