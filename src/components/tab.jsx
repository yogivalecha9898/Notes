import { useState } from 'react'
import { useEffect } from 'react'
import { st, db } from '../firebase'
import '../styles/tab.css'

function Tab({ props }) {

    const[file, setFile] = useState('')
    const[caption, setCaption] = useState('')
    const[arr, setArr] = useState([])
    const[branch, setBranch] = useState('')
    const[curBranch, setCBranch] = useState('')
    const[pass, setPass] = useState('')
    const[oN, setOName] = useState('')
    const[year, setYear] = useState('') 

    useEffect(() => {
        const b = props.match.params.id
        setBranch(b.substring(1, b.length))
        if(branch) {
            setYear(localStorage.getItem("year"))
            setOName(localStorage.getItem("ownerName"))
            setPass(localStorage.getItem("pass"))
            setCBranch(localStorage.getItem("branch"))
        }
    }, [branch])

    useEffect(() => {
        if(branch && year) {
            db.collection(`${year}`).doc(`${branch}`).collection('notes').onSnapshot(values => {//live changes in the postings
                var a = []
                values.forEach(val => a.push(val.data()))
                setArr(a)
            })
        }
    }, [branch, year])

    const handleSubmit = e => {
        e.preventDefault()
        st.ref(`notes/${file.name}`).put(file).on('state_changed', 
            snapshot => {
                console.log(snapshot.bytesTransferred/snapshot.totalBytes)
            },
            error => {
                console.log(error)
            },
            () => {
                st.ref(`notes/${file.name}`).getDownloadURL().then(url => {
                    db.collection(`${year}`).doc(`${branch}`).collection('notes').add({
                        Owner: oN,
                        URL: url,
                        ID: pass,
                        Caption: caption
                    }).then(msg => {
                        console.log(msg, pass)
                        const form = document.getElementById('form1')
                        form.reset()
                        setCaption('')
                    })
                })
            }
        )
    }

    return (
        <div className="outer">
            <div className="show">
                <div className="sec">
                    {arr.map(obj => {
                        return (
                            <div key={obj.ID} className="mainDiv">
                                <strong>{obj.Owner}</strong>
                                <img height="100" width="100" src={obj.URL} alt={obj.Caption} />
                                <p>{obj.Caption}</p>
                            </div>
                        )
                    })}
                </div>
                {curBranch === branch ?
                    <div className="formSec">
                        <form id="form1" onSubmit={handleSubmit}>
                            File: <input type="file" onChange={e => setFile(e.target.files[0])}/>
                            Caption: <input type="text" value={caption} placeholder="Caption" onChange={e => setCaption(e.target.value)}/>
                            <div className="buts">
                                <input className="buts" type="reset" value="Reset"/>
                                <input className="buts" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                    :
                    <div className="formSec"></div>
                }
                </div>
        </div>
    )
}

export default Tab