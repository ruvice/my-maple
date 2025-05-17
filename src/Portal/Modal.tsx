// components/Modal.tsx
import Portal from './Portal';
import './Modal.css'

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  noBackdrop: boolean;
};

export default function Modal({ onClose, children, noBackdrop }: ModalProps) {
    return (
        <Portal>
            <div className={`modal ${noBackdrop ? '' : 'backdrop'}`} onClick={onClose}>
                <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                {children}
                </div>
            </div>
        </Portal>
    );
}
