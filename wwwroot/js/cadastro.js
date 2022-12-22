window.onload = function(){
    const form = document.getElementById("form") //pegamos o formulario do html
    const email = document.getElementById("email")//pegamos o input de email
    const password = document.getElementById("password")//p input de password
    
    form.onsubmit = async function(e){//quando o formulario for "subimitado", a seguinte funçao sera executada

        e.preventDefault()

        var data = {
            email: email.value, //variavel data recebe os valores digitados em email, e em password (em formato json)
            password: password.value
        }

        const response = await fetch("http://localhost:3000/api/v1/users/create", { //faz uma requisição a API
            method: "POST",//com o metodo post
            headers: {
                "Content-Type": "application/json"//o cabeçalho indica que o tipo de conteudo dessa requisição é um json
            },
            body: JSON.stringify(data) //enviamos como corpo a variavel data em forma json
        })

        response.json().then(data => {
            if(data.message){//tratamos a resposta
                alert(data.message)
            }
            if(data.email){
                alert("Usuário criado")
            }
        })
    }
}