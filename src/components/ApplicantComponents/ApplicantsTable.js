import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
import { sort } from '../../Redux/applicantSlice'
const ApplicantsTable = ({ ApplicantData }) => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const recordsPerPage = 10
    const lastIndex = recordsPerPage * page
    const firstIndex = lastIndex - recordsPerPage

    return (
        <>
            {
                ApplicantData && ApplicantData.length > 0 ? <div className='table-responsive' >
                    <table className='table border' border="1" >
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>S.NO</th>
                                <th onClick={() => dispatch(sort("name"))}>Name of the Applicant</th>
                                <th>Email & Mobile</th>
                                <th>Role</th>
                                <th>Passout</th>
                                <th onClick={() => dispatch(sort("experience"))}>Experience</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ApplicantData.length > 0 ? ApplicantData.slice(firstIndex, lastIndex).map((Applicant, index) => <tr className={Applicant.status ==="Rejected" ?"text-warning":""} key={index}>
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
                    {
                        ApplicantData.length > 0 ?
                            <div>
                                <div className='float-right'>
                                    <button onClick={() => page > 1 && setPage(page - 1)} className='btn btn-light' disabled={page === 1}>Prev</button>
                                    <button className='btn btn-primary ml-1 mr-1'>{page}</button>
                                    {/* {
                                    [...Array(Math.ceil(ApplicantData.length / recordsPerPage))].map((item, index) => {
                                        return <button onClick={() => setPage(index + 1)} className={(page === index+1 ? "mr-1 ml-1 btn btn-primary" :"btn btn-light mr-1 ml-1")}>{index + 1}</button>
                                    })
                                } */}
                                    <button onClick={() => page < Math.ceil(ApplicantData.length / recordsPerPage) && setPage(page + 1)} className='btn btn-light' disabled={page === Math.ceil(ApplicantData.length / recordsPerPage)}>Next</button>
                                </div></div> : null
                    }
                </div> : null
            }   

        </>
    )
}
export default ApplicantsTable

// {
//     ApplicantData.length > 0 ? <div className='float-right'>
//         <button onClick={() => page > 1 && setPage(page - 1)} className='btn btn-light' disabled={page === 1}>Prev</button>
//         {
//             [...Array(Math.ceil(ApplicantData.length / recordsPerPage))].map((item, index) => {
//                 return <button onClick={() => setPage(index + 1)} className={(page === index + 1 ? "mr-1 ml-1 btn btn-primary" : "btn btn-light mr-1 ml-1")}>{index + 1}</button>
//             })
//         }
//         <button onClick={() => page < Math.ceil(ApplicantData.length / recordsPerPage) && setPage(page + 1)} className='btn btn-light' disabled={page === Math.ceil(ApplicantData.length / recordsPerPage)}>Next</button>
//     </div> : null
// }
//  Applicants Per Page: <span><select className='btn btn-primary ml-2' onChange={(e) => setRecodesPerPage(e.target.value)}>
//     <option value={5}>5</option>
//     <option value={10}>10</option>
//     <option value={15}>15</option>
//     <option value={20}>20</option>
// </select></span>