import React, {Fragment, useState, useEffect} from 'react'
import './switch.css'

function Toggler({isChecked, data, childtoparent}) {

    const [state, setState] = useState(isChecked);

    const handleChange = () => {
        setState(prevState => !prevState)
        setData()
    }

    const setData = () => {
        let val = ''
        if (!state) {
            val = Object.keys(data[0])[0]
        } else {
            val = Object.keys(data[1])[0]
        }
        childtoparent(val)
    }


    // console.log(data);
    // console.log(data[0]);
    // console.log(Object.keys(data[0])[0]);
    // console.log(Object.keys(data[1])[0]);
    // console.log(Object.values(data[0])[0]);
    // console.log(Object.values(data[1])[0]);
    useEffect(() => {
    }, [])
    

    return (
        <>
            <label className="switch">
                <input type="checkbox" value={state} onChange={handleChange} />
                <div className="slider"></div>
                {
                    state ? 
                    <span className="yes-check">{ data ? Object.values(data[0])[0] : 'Yes'}</span> 
                    : 
                    <span className="no-check">{ data ? Object.values(data[1])[0] : 'No'}</span>
                }
            </label>
        </>
    )
}

export default Toggler
