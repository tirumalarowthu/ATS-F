import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
import { sort } from '../../Redux/applicantSlice'

const ApplicantsTable = ({ ApplicantData }) => {

    const dispatch = useDispatch()
    
    return (
        <>
            {
                ApplicantData && ApplicantData.length > 0 ? <div className='table-responsive' >
                    <table className='table border' border="1" >
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>S.NO</th>
                                <th onClick={()=>dispatch(sort("name"))}>Name of the Applicant</th>
                                <th>Email & Mobile</th>
                                <th>Role </th>
                                <th >Passout</th>
                                <th onClick={() => dispatch(sort("experience"))}>Experience</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ApplicantData.length > 0 ? ApplicantData.map((Applicant, index) => <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td><Link to="/fullview"><button onClick={() => dispatch(GetApplicant(Applicant))} className='btn'>{Applicant.name}</button></Link></td>
                                    <td><div>{Applicant.email}<br></br>{Applicant.mobile}</div></td>
                                    <td>{Applicant.role}</td>
                                    <td>{Applicant.passout}</td>
                                    <td>{Applicant.experience === 0 ? "Fresher" : <>{Applicant.experience}<sup>+</sup> years</>}</td>
                                    <td>{Applicant.status}</td>
                                    <td><Link to="/updateApplicant"><button onClick={() => dispatch(GetApplicant(Applicant))} className='btn btn-primary' >Click here</button></Link></td>
                                </tr>) : <tr><td>Please wait...</td></tr>
                            }
                        </tbody>
                    </table>
                </div> : null
            }
        </>
    )
}
export default ApplicantsTable

