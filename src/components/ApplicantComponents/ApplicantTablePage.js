import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GetApplicant } from '../../Redux/updateApplicantSlice'
import { sort } from '../../Redux/applicantSlice'

let PageSize = 10; //No of users per page  

export default function ApplicantTablePage({ ApplicantData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()
  const data = ApplicantData;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,data]);
  return (<>
    <div>
      <table className='table table-responsive table-hover '>
        <thead className='bg-dark text-white '>
          <tr >
            <th>S.NO</th>
            <th onClick={() => dispatch(sort("name"))}>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Passout</th>
            <th onClick={() => dispatch(sort("experience"))}>Experience</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody className='border border-2'>
          {
            currentTableData.map((Applicant, index) => <tr onClick={() => dispatch(GetApplicant(Applicant))} className={Applicant.status === "Rejected" ? "text-warning" : ""} key={index}>
              <td >{((currentPage-1)*10) + index+1}</td>
              <td><Link style={{ color: "#333" }} onClick={() => dispatch(GetApplicant(Applicant))} to="/fullview">{Applicant.name}</Link></td>
              <td>{Applicant.email}</td>
              <td>{Applicant.mobile}</td>
              <td>{Applicant.role}</td>
              <td>{Applicant.passout}</td>
              <td>{Applicant.experience === 0 ? "Fresher" : <>{Applicant.experience}<sup>+</sup> years</>}</td>
              <td>{Applicant.status}</td>
              <td><Link to="/updateApplicant"><button onClick={() => dispatch(GetApplicant(Applicant))} className='btn btn-primary' >Click here</button></Link></td>
            </tr>)
          }

        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  </>
  );
}
