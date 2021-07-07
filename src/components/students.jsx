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

        //using classic call back hell
        db.collection(`${year}`).doc(`${branch}`).collection('students').add({
            Name: name,
            Gender: gender
        })//adding a new student in a particular year and branch
        .then(docRef => {
            db.collection(`${year}`).doc(`${branch}`).collection('students').doc(`${docRef.id}`).update({
                Roll: docRef.id//updaing the roll number of student
            }).then(doc => {//after updating the roll in firestore pushing the details of this student to realtime database
                rl.ref(`${year}`).push({
                    Name: name,
                    Branch: branch,
                    Email: `${docRef.id}@gmail.com`,
                    Password: docRef.id,
                }).then(user => {
                    auth.createUserWithEmailAndPassword(`${docRef.id}@gmail.com`, docRef.id)//create an account in authentication
                    .then(user => {
                        db.collection(`${year}`).doc(`${branch}`).collection('students').onSnapshot(values => {
                            var a = []
                            values.forEach(val => a.push(val.data()))
                            setArr(a)//real time updates after a student is added
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