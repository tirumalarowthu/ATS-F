import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CForm, CFormInput } from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { fetchApplicants } from '../../Redux/applicantSlice'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
const FullDetailsForm = ({ applicantdetails }) => {
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch()
    const [postData, setPostData] = useState({
        email: applicantdetails.email,
        commentBy: "",
        comment: "",
        status: "",
        cRound: applicantdetails.status,
        nextRound: ""
    })
    const handleUpdateApplicantStatus = async (e) => {
        e.preventDefault()
        if (postData.email !== "" && postData.commentBy !== "" && postData.comment !== "" && postData.status !== "" && postData.nextRound !== "") {
            const config = { headers: { "Content-Type": "Application/json" } }
            await axios.put("http://localhost:9001/appicant/update/comments", postData, config)
                .then((res) => {
                    toast.success(res.data.name + "updated successfully")
                    dispatch(fetchApplicants())
                    dispatch(GetApplicant(""))
                }).catch((err) => {
                    toast.info("Unable to update now ! try after some time")
                })
        } else {
            alert("All feilds are required")
        }
    }
    //Handling input Change 
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPostData({ ...postData, [name]: value })
    }
    return (
        <>
            {
                Object.keys(applicantdetails).length > 0 ? <>
                    <CCard className="mb-4 container">
                        <CCardHeader className='text-center'>
                            Applicant Full View
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CForm className="row g-3 needs-validation">
                                    <CCol md={6}>
                                        <CFormInput type="text" value={applicantdetails.name} readOnly label="Name of the Applicant" />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="email"
                                            value={applicantdetails.email}
                                            readOnly
                                            name="email"
                                            label="Email"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="Number"
                                            name="mobile"
                                            value={applicantdetails.mobile}
                                            readOnly
                                            label="Mobile Number"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            className='form-control'
                                            name="role"
                                            value={applicantdetails.role}
                                            readOnly
                                            label="Applied Role"
                                        >
                                        </CFormInput>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            name="collegeName"
                                            value={applicantdetails.collegeName}
                                            readOnly
                                            label="College Name"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            name="qualification"
                                            value={applicantdetails.qualification}
                                            readOnly
                                            label="Qualification"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="Number"
                                            name="passout"
                                            value={applicantdetails.passout}
                                            readOnly
                                            label="Passout Year"
                                        />
                                    </CCol>
                                    {
                                        applicantdetails.experience > 0 ? <>
                                            <CCol md={6}>
                                                <CFormInput
                                                    type="text"
                                                    name="previousCompany"
                                                    value={applicantdetails.previousCompany}
                                                    readOnly
                                                    label="Previous Company Name"
                                                />
                                            </CCol>
                                            <CCol md={6}>
                                                <CFormInput
                                                    type="Number"
                                                    name="experience"
                                                    value={applicantdetails.experience}
                                                    readOnly
                                                    label="Experience in Years"
                                                />
                                            </CCol>


                                        </> : null
                                    }


                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={applicantdetails.nextRound}
                                            readOnly
                                            placeholder="Next Round Owner"
                                            id="nextRound"
                                            label="Next Round Owner"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={applicantdetails.status}
                                            readOnly
                                            placeholder="Status of the applicant"
                                            id="status"
                                            label="Status of the applicant"
                                            required
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            value={applicantdetails.createdAt.substring(0, 10)}

                                            readOnly
                                            label="Applied Date"
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            onClick={() => window.open(`${applicantdetails.resumeLink}`)}
                                            value={applicantdetails.resumeLink}
                                            style={{ color: "green", cursor: "pointer" }}
                                            readOnly
                                            label="Resume Link"
                                        />
                                    </CCol>
                                </CForm>

                                {
                                    applicantdetails.comments.length > 0 ? <>
                                        <React.Fragment>
                                            <table className='table border border-1 my-4'>
                                                <thead className='bg-dark text-white'><tr><th>Commented By</th><th>Comment Round</th><th>Comments</th></tr></thead>
                                                <tbody className='tbody'>
                                                    {
                                                        applicantdetails.comments.map((item, index) =>
                                                            < tr key={index} >
                                                                <td>{item.commentBy}</td>
                                                                <td>{item.cRound}</td>
                                                                <td>{item.comment}</td>
                                                            </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </React.Fragment>

                                    </> : null
                                }
                            </CRow>
                        </CCardBody>
                        <div className="container">
                            <button style={{ margin: " 0px 20px 10px 0px" }} onClick={() => setUpdate(!update)} className='btn btn-primary float-right'>Add Comments</button>
                        </div>

                        {update && <CCardBody>
                            <CCardHeader className='text-center '>
                                Update Applicant Status
                            </CCardHeader><br />
                            <form onSubmit={handleUpdateApplicantStatus}>
                                <div className="">
                                    <label>Status of the Applicant :</label>
                                    <select className='form-select' onChange={handleInputChange} name="status">
                                        <option defaultValue={applicantdetails.status}>{applicantdetails.status}</option>
                                        <option value="Assignment">Assignment</option>
                                        <option value="Technical Round">Technical Round</option>
                                        <option value="Final Round">Final Round</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div><br />
                                <div className="">
                                    <label>Next Round Owner :</label>
                                    <select className='form-select' onChange={handleInputChange} name="nextRound">
                                        <option disabled>--choose Next Round Owner--</option>
                                        <option value="Bhavya">Bhavya</option>
                                        <option value="Veera">Veera</option>
                                        <option value="Rathnakar">Rathnakar</option>
                                        <option value="Balaji">Balaji</option>
                                    </select>
                                </div><br />
                                <div className="">
                                    <label>Comments for the Round :</label>
                                    <input className='form-control' name='cRound' readOnly value={applicantdetails.status} onChange={handleInputChange} type="text" />
                                </div><br />
                                <div className="">
                                    <label>Comment By :</label>
                                    <input className='form-control' name='commentBy' value={postData.commentBy} onChange={handleInputChange} type="text" />
                                </div><br />
                                <div className="">
                                    <label>Comments :</label>
                                    <input className='form-control' name="comment" value={postData.comment} onChange={handleInputChange} type="text" />
                                </div>
                                <br />
                                <div>
                                    <button className='btn btn-primary'>Update</button>
                                </div>
                            </form>
                        </CCardBody>}

                    </CCard>

                </> : null
            }
        </>
    )
}

export default FullDetailsForm






    // < td > <ConfirmModel _id={applicantdetails._id} commentOne={item.comment} commentId={item._id} /></ >