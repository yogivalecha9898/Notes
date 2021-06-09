import { useEffect } from 'react'
import { useState } from 'react'
import Branch from './branch'

function Admin() {

    useEffect(() => {
        let date = new Date()
        setYear(date.getFullYear())
    }, [])
    
    const[year, setYear] = useState(0)
    const[clgYear, setCYear] = useState(-1)

    return (
        <>
            {clgYear === -1 ?
                <div>
                    <div>
                        <div className="year">
                            Academic Year <h1>{year} - {year+1}</h1>
                        </div>
                    </div>
                    <div className="fi">Proceed for First Year <button onClick={() => setCYear(0)}>Go</button></div>
                    <div className="se">Proceed for Second Year <button onClick={() => setCYear(1)}>Go</button></div>
                    <div className="th">Proceed for Third Year <button onClick={() => setCYear(2)}>Go</button></div>
                    <div className="fo">Proceed for Fourth Year <button onClick={() => setCYear(3)}>Go</button></div>
                </div>:<div><button onClick={() => setCYear(-1)}>Prev</button></div>
            }
            {clgYear === 0 ?
                <div>
                    Welcome to first Year
                    <Branch  year = {"First"} />
                </div>:<div></div>
            }
            {clgYear === 1 ?
                <div>
                    Welcome to Second Year
                    <Branch  year = {"Second"} />
                </div>:<div></div>
            }
            {clgYear === 2 ?
                <div>
                    Welcome to Third Year
                    <Branch  year = {"Third"} />
                </div>:<div></div>
            }
            {clgYear === 3 ?
                <div>
                    Welcome to Fourth Year
                    <Branch  year = {"Fourth"} />
                </div>:<div></div>
            }
        </>
    )
}

export default Admin