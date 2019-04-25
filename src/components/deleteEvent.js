import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

const DeleteEvent = props => {
    const [modal, setModal] = useState(false);

    const action = () => {
        props.handleDeleteEvent();
        toggle();
    };

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <Button color="primary" onClick={toggle}>
                <MdDelete />
            </Button>
            <Modal isOpen={modal} toggle={toggle} centered autoFocus>
                <ModalHeader toggle={toggle}>Delete Event {props.title}</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={action}>
                        Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default DeleteEvent;
