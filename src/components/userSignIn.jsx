import { useState } from "react"
import { auth, rl } from '../firebase'
import '../styles/user.css'

function UserSignIn({ props, year }) {

    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        localStorage.setItem("year", year)
        const form = document.getElementById('form')
        rl.ref(`${year}`).get().then(val => {
            let sure = false
            val.forEach(value => {
                if(value.val().Password === pass) {
                    sure = true
                    localStorage.setItem("branch", value.val().Branch)
                    localStorage.setItem("ownerName", value.val().Name)
                }
            })
            if(sure) {
                localStorage.setItem("year", year)
                localStorage.setItem("pass", pass)
                auth.signInWithEmailAndPassword(email, pass).then(obj => {
                    if(obj) {
                        localStorage.setItem("userA", obj.user.uid)
                        props.history.push("/explore")
                    }
                })
                .catch(err => alert(err))
            }
            else alert("The user does not exist in the current year")
            setEmail('')
            setPass('')
        })
        form.reset()
    }

    return (
        <div>
            <div class="formC">
                <form id = "form" onSubmit={handleSubmit}>
                    <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="text" value={pass} placeholder="Password" onChange={e => setPass(e.target.value)}/>
                    <input class="submit" type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default UserSignIn