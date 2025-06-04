# Como fazer os pedidos para o Backend

## Rotas

Use o fetch
- Hello World! ('http://localhost:4000/')
- Usuarios ('http://localhost:4000/usuario')
- Musica ('http://localhost:4000/musica')
- Artista ('http://localhost:4000/artista')

### Rota Usuários
- Listar ('http://localhost:4000/usuario/') | GET
- Adicionar ('http://localhost:4000/usuario/') | POST
- Buscar por email ('http://localhost:4000/usuario/:email') | GET
- Atualizar por email ('http://localhost:4000/usuario/:email') | PUT
- Apagar por id ('http://localhost:4000/usuario/:id') | DELETE

### Rota Músicas
- Listar ('http://localhost:4000/musica/') | GET
- Adicionar ('http://localhost:4000/musica/') | POST
- Buscar por nome ('http://localhost:4000/musica/:nome') | GET
- Atualizar por nome ('http://localhost:4000/musica/:nome') | PUT
- Apagar por id ('http://localhost:4000/musica/:id') | DELETE

### Rota Artistas
- Listar ('http://localhost:4000/artista/') | GET
- Adicionar ('http://localhost:4000/artista/') | POST
- Buscar por email ('http://localhost:4000/artista/:email') | GET
- Atualizar por email ('http://localhost:4000/artista/:email') | PUT
- Apagar por id ('http://localhost:4000/artista/:id') | DELETE