// components/Modal.tsx
import Portal from './Portal';
import './Modal.css'

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  noBackdrop: boolean;
  style?: string;
};

export default function Modal({ onClose, children, noBackdrop }: ModalProps) {
    const pointerEvents = noBackdrop ? 'none' : 'auto';
    return (
        <Portal>
            <div className={`modal ${noBackdrop ? '' : 'backdrop'}`} onClick={onClose} style={{ pointerEvents }}>
                <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                {children}
                </div>
            </div>
        </Portal>
    );
}
