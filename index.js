const { request, response } = require('express')
const express = require('express')/*chamando o express*/
const uuid = require('uuid')

const port = 3000
const app = express()/*tornando o Express uma varialvel para facilitar*/
app.use(express.json())//Sempre antes das ROTAS.

/*
-Query params => meusite.com/users?nome=wilson&age55 //Filtros
-Route params => /users/2  //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
-REquest Body => {"name":"Wilson","age":}

-GET => Buscar informações no back end
-POST => Criar informações no back end
-PUT / PATCH => Alterar/Atualizar informações no back end
-DELETE => Deletar informações no back end

-Middleware = INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição
*/

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

request.userIndex = index
request.userId = id

next()

}

app.get('/users', (request, response) => {
    /*const name = request.query.name
    const age = request.query.age*/
    // const {id} = request.params //destructuring assignment (descontruindo objeto e criando variaveis)

    //console.log(request.body)
    
    return response.json(users)
})/*criar rota, GET serve para enviar informação*/

app.post('/users', (request, response) => {
    const { name, age } = request.body
    
    const user = { id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}
    
    users[index] = updateUser
    
    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {   
    const index = request.userIndex
    const id = request.userId
    //users.findIndex(user => user.id === id)

        users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`Meu servidor ta rodando ${port}`)
})

