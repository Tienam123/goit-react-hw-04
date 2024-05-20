import Modal from 'react-modal';
import {lockedScroll} from "@/services/lockedScroll.js";


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