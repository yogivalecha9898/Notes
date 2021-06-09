import { useState } from "react"
import Students from './students'

function Branch({ year }) {

    const[branch, setBranch] = useState(-1)

    return (
        <div>
            {branch === -1 ?
                <div>
                    <div className="CSE">CSE branch <button onClick={() => setBranch(0)}>Go</button></div>
                    <div className="ME">Mechanical branch <button onClick={() => setBranch(1)}>Go</button></div>
                    <div className="CV">Civil branch <button onClick={() => setBranch(2)}>Go</button></div>
                    <div className="ECE">Electrical branch <button onClick={() => setBranch(3)}>Go</button></div>
                </div>:<div><button onClick={() => setBranch(-1)}>Prev</button></div>
            }

            {branch === 0 ?
                <div>
                    <Students branch={"CSE"} year={year}/>
                </div>:<div></div>
            }
            {branch === 1 ?
                <div>
                    <Students branch={"Mechanical"} year={year}/>
                </div>:<div></div>
            }
            {branch === 2 ?
                <div>
                    <Students branch={"Civil"} year={year}/>
                </div>:<div></div>
            }
            {branch === 3 ?
                <div>
                    <Students branch={"Electrical"} year={year}/>
                </div>:<div></div>
            }
        </div>
    )
}

export default Branch