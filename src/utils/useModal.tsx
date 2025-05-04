import { useState, ReactNode, useCallback } from 'react';
import Modal from '../Portal/Modal';

export function useModal() {
    const [content, setContent] = useState<ReactNode | null>(null);

    const showModal = useCallback((modalContent: ReactNode) => {
        setContent(modalContent);
    }, []);

    const hideModal = useCallback(() => {
        setContent(null);
    }, []);

    const ModalRenderer = useCallback(() => {
        if (!content) return null;
        return <Modal onClose={hideModal}>{content}</Modal>;
    }, [content, hideModal]);

    return { showModal, hideModal, ModalRenderer };
}
