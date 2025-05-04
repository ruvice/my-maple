// components/Modal.tsx
import Portal from './Portal';
import './Modal.css'

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <Portal>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  );
}
