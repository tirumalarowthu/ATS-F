import axios from 'axios'
import React, { useState } from 'react'
import UpdateStatus from './UpdateStatus'

const UpdateOneApp = () => {
    const [email, setEmail] = useState("")
    const [data, setData] = useState({})

    //for getting the details of the applicant              
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            alert("please enter email of the applicant")
        } else {
            try {
                const data = await axios.get(`http://localhost:9001/singleApplicant/${email}`).then(res => res.data)
                setData(data)
                console.log(data)
            } catch (err) {
                console.log(err.message)
            }

        }
    }
    return (
        <>
            <div className='container p-2 my-4 border border-2'>
                <form onSubmit={handleSubmit} className='p-2'>
                    <label>Enter Email of the Applicant</label>
                    <input className='form-control' type="email" onChange={(e) => setEmail(e.target.value)} /><br />
                    <button className='btn btn-primary'>Get Details</button>
                </form>
                {
                    Object.keys(data).length > 0 ? <UpdateStatus details={data} /> : null
                }
            </div>
        </>
    )
}

export default UpdateOneApp