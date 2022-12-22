window.onload = function(){
    const form = document.getElementById("form")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    //aqui é basicamente a mesma coisa
    form.onsubmit = async function(e){
        e.preventDefault()

        var data = {
            email: email.value,
            password: password.value
        }

        const response = await fetch("http://localhost:3000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        response.json().then(data => {
            if(data.message){
                alert(data.message)
            }
            
        })
    }
}