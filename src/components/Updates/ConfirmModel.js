import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModel({ handleUpdateApplicantStatus }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to update status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please confirm that you want to update applicant status</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                       handleUpdateApplicantStatus()

                    }
                    }>
                        Update Applicant
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModel