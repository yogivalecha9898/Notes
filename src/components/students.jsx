import { useState } from 'react'
import { db, rl, auth } from '../firebase'

function Students({ year, branch }) {

    const[sure, setSure] = useState(false)
    const[name, setName] = useState('')
    const[gender, setGender] = useState('Neutral')
    const[arr, setArr] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = document.getElementById('form')

        db.collection(`${year}`).doc(`${branch}`).collection('students').add({
            Name: name,
            Gender: gender
        })
        .then(docRef => {
            db.collection(`${year}`).doc(`${branch}`).collection('students').doc(`${docRef.id}`).update({
                Roll: docRef.id
            }).then(doc => {
                rl.ref(`${year}`).push({
                    Name: name,
                    Branch: branch,
                    Email: `${docRef.id}@iiitvadodara.ac.in`,
                    Password: docRef.id,
                }).then(user => {
                    auth.createUserWithEmailAndPassword(`${docRef.id}@iiitvadodara.ac.in`, docRef.id)
                    .then(user => {
                        db.collection(`${year}`).doc(`${branch}`).collection('students').onSnapshot(values => {
                            var a = []
                            values.forEach(val => a.push(val.data()))
                            setArr(a)
                            setSure(false)
                        })
                    })
                    .catch(err => console.log(err))
                })
            }).catch(err => console.log(err))
        })

        form.reset()
        setGender('Neutral')
        setName('')
    }

    return (
        <div>
            <button className="question" onClick={() => setSure(true)}>Add Student</button>
            {sure ? 
                <div>
                    <form id="form" onSubmit={handleSubmit}>
                        <label>
                            <h3>Name</h3>
                            <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
                        </label>
                        <label>
                            <h3>Gender</h3>
                            Male<input type="radio" name="gender" onClick={() => setGender('Male')}/>
                            Female<input type="radio" name="gender" onClick={() => setGender('Female')}/>
                        </label>
                        <label>
                            <input type="submit" value="Submit"/>
                        </label>
                    </form>
                    <button onClick={() => {
                        setSure(false)
                        setName('')
                        setGender('Neutral')
                    }}>Close</button>
                </div>
                :
                <div>
                    {arr.map(val => {
                        return (
                            <div key={val.Roll}>
                                <p>Name: <strong>{val.Name}</strong></p>
                                <p>Roll: <strong>{val.Roll}</strong></p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Students