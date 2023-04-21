import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchApplicants } from '../../Redux/applicantSlice'
import { GetApplicant } from '../../Redux/updateApplicantSlice'

const UpdateStatus = ({ details }) => {
    // console.log(details)
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        email: details.email,
        commentBy: "",
        comment: "",
        status: "",
        cRound: details.status,
        nextRound: ""
    })
    const handleUpdateApplicantStatus = async (e) => {
        e.preventDefault()
        if (postData.email !== "" && postData.commentBy !== "" && postData.comment !== "" && postData.status !== "" && postData.nextRound !== "") {
            console.log("first")
            const config = { headers: { "Content-Type": "Application/json" } }
            await axios.put("http://localhost:9001/appicant/update/comments", postData, config)
                .then((res) => {
                    toast.success("Applicant updated successfully")
                    dispatch(fetchApplicants())
                    dispatch(GetApplicant(""))
                    window.location.reload(false)
                }).catch((err) => {
                    toast.info(err.message)
                })
        } else {
            alert("All feilds are required")

        }
    }
    //updating the state with new input values
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPostData({ ...postData, [name]: value })
    }
    console.log(postData)
    return (
        <>
            {
                Object.keys(details).length > 0 ? <form onSubmit={handleUpdateApplicantStatus} className='my-4'>
                    <div className="">
                        <label>Name of the Applicant :</label>
                        <input value={details.name} readOnly className='form-control ' type="text" />
                    </div><br />
                    <div className="">
                        <label>Role of the Applicant :</label>
                        <input value={details.role} readOnly className='form-control ' type="text" />
                    </div><br />
                    <div className="">
                        <label>Status of the Applicant :</label>
                        <select className='form-select' onChange={handleInputChange} name="status">
                            <option value={details.status}>{details.status}</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Technical Round">Technical Round</option>
                            <option value="Final Round">Final Round</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        {/* <input value={formdata.status} readOnly className='form-control ' type="text" /> */}
                    </div><br />
                    <div className="">
                        <label>Next Round Owner :</label>
                        <select className='form-select' value={postData.nextRound} onChange={handleInputChange} name="nextRound">
                            <option disabled>--choose Next Round Owner--</option>
                            <option value="Bhavya">Bhavya</option>
                            <option value="Veera">Veera</option>
                            <option value="Rathnakar">Rathnakar</option>
                            <option value="Balaji">Balaji</option>
                        </select>
                    </div><br />
                    <div className="">
                        <label>Comments for the Round :</label>
                        <input className='form-control' name='cRound' value={details.status} readOnly onChange={handleInputChange} type="text" />
                    </div><br />
                    <div className="">
                        <label>Comment By :</label>
                        <select className='form-select' name='commentBy' onChange={handleInputChange} type="text">
                            <option>--Choose Comment By --</option>
                            <option value="Bhavya">Bhavya</option>
                            <option value="Veera">Veera</option>
                            <option value="Rathnakar">Rathnakar</option>
                            <option value="Balaji">Balaji</option>
                        </select>
                    </div><br />
                    <div className="">
                        <label>Comments :</label>
                        <input className='form-control' name="comment" value={postData.comment} onChange={handleInputChange} type="text" />
                    </div>
                    <br />
                    <div>
                        <button className='btn btn-primary'>Update</button>
                    </div>
                </form> : <p></p>
            }
        </>
    )
}

export default UpdateStatus