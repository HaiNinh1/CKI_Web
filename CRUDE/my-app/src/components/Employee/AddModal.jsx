import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddModal = (props) => {
    const { show, setShow, onAdd } = props;

    const handleClose = () => {
        setShow(false);
    };

    // State cho các trường Employee
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !position) return;
        onAdd({ name, email, phone, position });
        setName(''); setEmail(''); setPhone(''); setPosition('');
        handleClose();
    };

    const headerStyle = {
        backgroundColor: '#0d6efd',
        color: 'white',
        padding: '10px 15px',
        borderBottom: 'none'
    };
    const titleStyle = {
        color: 'white',
        fontWeight: '500'
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="md"
            backdrop="static"
            className="modal-add-user"
        >
            <Modal.Header closeButton style={headerStyle}>
                <Modal.Title style={titleStyle}>New Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Position</label>
                        <input type="text" className="form-control" value={position} onChange={e => setPosition(e.target.value)} required />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddModal;