const express = require("express") // importamos o express
const { PrismaClient } = require("@prisma/client") // e importamos a classe PrismaClient
const prisma = new PrismaClient()// Criamos um novo objeto PrismaClient
const app = express()// instanciamos o express no app
const { join } = require("path") //importamos a funçao join do pacote path

app.use(express.json()) //indicamos ao nosso app que queremos que ele envie respostas e receba requisiçoes json
app.use(express.static(join(__dirname, "wwwroot"))) // indicamos ao app que queremos que ele "carregue" o diretorio wwwroot

app.post("/api/v1/users/login", async (req, res) => { //criamos a rota
    const { email, password } = req.body //pegamos o email e o password de forma desestruturada do req.body
    //o req.body tem que conter um json assim:
    /*
    {
        "email": "ola@gmail.com",
        "password": "senha legal"
    }

    os nomes das constantes tem que ser exatos aos que estão no json, para atribuiçao direta
    */
    const user_exists = await prisma.user.findUnique({ //aqui, pedimos que o prisma procure por um user
        // que tenha a propriedade email que contenha o mesmo valor da const email
        where: {
            email: email,
        }
    })
    if(user_exists){ //se existir usuario
        if(password === user_exists.password){//se a senha recebida pela api for igual a senha do banco de dados
            return res.status(200).json({ // a resposta sera OK e o json enviado contem a mensagem "Logado com sucesso"
                message: "Logado com sucesso!"
            })
        }
    }
    return res.status(401).json({ //caso não exista usuarios com o email, ou a senha incorreta.
        // sera enviada a resposta de Unauthorized (401) e a mensagem "Email ou senha incorreto!"
        message: "Email ou senha incorreto!"
    })
})

app.post("/api/v1/users/create", async (req, res) => { // cria rota

    const { email, password } = req.body //recebe os valores do req.body
    const user_exists = await prisma.user.findUnique({//procura no banco de dados se ha algum usuario com este email
        where: {
            email: email
        }
    })
    if(!user_exists){//se nao houver
        const user = await prisma.user.create({//crie um usuario novo, com o email sendo o email recebido
            //e a senha sendo a senha recebida
            data: {
                email: email,
                password: password
            }
        })

        return res.status(201).json(user)//e a resposta sera created, e o json serao os dados do usuario
    }
    return res.status(401).json({//caso contrario, a resposta sera Unauthorized
        //e o json tera a mensagem que o email ja foi utilizado
        message: "Este email já esta em uso!"
    })
})  

app.listen(3000, () => {//ligamos o servidor na porta 3000
    console.log("Servidor online!")
})