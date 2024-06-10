import fastify from 'fastify'
import { appRoutes } from './http/routes'

const app = fastify()

// Middleware para adicionar cabeçalhos de CORS
app.addHook('onRequest', (request, reply, done) => {
  // Configurações básicas de CORS
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Resposta para pré-voo (OPTIONS)
  if (request.method === 'OPTIONS') {
    reply.header('Access-Control-Max-Age', '86400')
    reply.status(204).send()
  } else {
    done()
  }
})

app.register(appRoutes)

// Exportar o app para ser usado em outros lugares (por exemplo, ao iniciar o servidor)
export { app }
