import Modal from 'react-modal';
import {useEffect} from "react";
import {lockedScroll} from "@/services/lockedScroll.js";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '80%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#modal-root');

const ImageModal = ({
                        children,
                        handleClose,
                        modalIsOpen
                    }) => {
    lockedScroll(modalIsOpen);
    return (<div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => handleClose()}
            contentLabel="Example Modal"
        >
            {children}
        </Modal>
    </div>);
}

export default ImageModal