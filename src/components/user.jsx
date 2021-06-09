import { useState } from "react"
import UserSignIn from './userSignIn'
import '../styles/user.css'
import { motion } from 'framer-motion'

function User({ props }) {

    const[year, setYear] = useState('')
    const[work, setWork] = useState(false)

    const obj1 = {
        ini: {
            right: 1000,
            opacity: 0
        },
        fin: {
            right: 0,
            opacity: 1,
            transition: {
                delay: 0.5,
                duration: 0.5
            }
        }
    }

    const obj2 = {
        ini: {
            top: 685,
            opacity: 0
        },
        fin: {
            top: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    const obj3 = {
        ini: {
            top: 100,
            opacity: 1,
            scale: 1.4
        },
        fin: {
            scale: 1,
            top: 20,
            transition: {
                duration: 0
            }
        }
    }

    const obj4 = {
        ini: {
            opacity: 0
        },
        fin: {
            opacity: 1,
            transition: {
                delay: 1
            }
        }
    }

    return (
        <div className="main">
            <motion.div 
             className="nav"
             variants={obj2}
             initial="ini"
             animate="fin"
            >
                <div className="fi" onClick={() => {
                    setYear('First')
                    setWork(true)
                }}>First Year</div>
                <div className="se" onClick={() => {
                    setYear('Second')
                    setWork(true)
                }}>Second Year</div>
                <div className="th" onClick={() => {
                    setYear('Third')
                    setWork(true)
                }}>Third Year</div>
                <div className="fo" onClick={() => {
                    setYear('Fourth')
                    setWork(true)
                }}>Fourth Year</div>
            </motion.div>
            <motion.div
             className="log"
             variants={obj1}
             initial="ini"
             animate="fin"
            >
                <div className="inner">
                    <motion.h1 variants={obj3} initial="ini" animate={work ? "fin":""}>Welcome to Login Session</motion.h1>
                    <motion.div 
                     className="form"
                     variants={obj4}
                     initial="ini"
                     animate={work ? "fin":""}
                    >
                        <h3>{year}</h3>
                        {
                            year ?
                            <UserSignIn year={year} props={props}/>:<div></div>
                        }
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default User