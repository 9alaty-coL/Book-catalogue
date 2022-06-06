import classes from './DeleteModal.module.scss'
import {Modal, Typography, Box} from '@mui/material'
import ReactDOM from "react-dom";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

// portal for modal
const portal = document.getElementById("root-portal");

const ModalPopup = props => <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
    {props.children}
    </Box>
    </Modal>

const DeleteModal = props => {
    return <>
        {ReactDOM.createPortal(<ModalPopup open={props.open} handleClose={props.handleClose}>{props.children}</ModalPopup>, portal)}
    </>
}

export default DeleteModal