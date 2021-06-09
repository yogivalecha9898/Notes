import { auth } from "../firebase"
import "../styles/explore.css"

function Explore({ props }) {

    const handleChange = (branch) => {
        props.history.push(`/tab:${branch}`)
    }

    const handleSign = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("userA")
            localStorage.removeItem("branch")
            localStorage.removeItem("ownerName")
            localStorage.removeItem("pass")
            localStorage.removeItem("year")
            props.history.push("/user")
            alert("Signed Out")
        }).catch(err => alert.log(err))
    }

    return (
        <div className="menu">
            <input className="menu-toggler" type="checkbox" />
            <label htmlFor="menu-toggler"></label>
            <ul>
                <div className="cs menu-item">
                    <strong onClick={() => handleChange("CSE")}><p>CSE</p></strong>
                </div>
                <div className="me menu-item">
                    <strong onClick={() => handleChange("Mechanical")}><p>Mechanical</p></strong>
                </div>
                <div className="cv menu-item">
                    <strong onClick={() => handleChange("Civil")}><p>Civil</p></strong>
                </div>
                <div className="ec menu-item">
                    <strong onClick={() => handleChange("Electrical")}><p>Electronics</p></strong>
                </div>
            </ul>
            <button onClick={handleSign}><p>Sign Out</p></button>
        </div>
    )
}

export default Explore