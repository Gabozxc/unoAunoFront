import { ReactNode, FC } from 'react';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, handleClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 '>
            <div className='bg-white p-4 rounded'>
                <div className='w-full text-right'>
                    <button onClick={handleClose} className='text-red-500'>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;