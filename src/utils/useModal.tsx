import { useState, ReactNode, useCallback } from 'react';
import Modal from '../Portal/Modal';

export function useModal() {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [noBackdrop, setNoBackdrop] = useState<boolean>(false);

    const showModal = useCallback((modalContent: ReactNode, noBackdrop?: boolean) => {
        setContent(modalContent);
        if (noBackdrop) {
            setNoBackdrop(noBackdrop);
        }
    }, []);

    const hideModal = useCallback(() => {
        setContent(null);
        setNoBackdrop(false);
    }, []);

    const ModalRenderer = useCallback(() => {
        if (!content) return null;
        return <Modal onClose={hideModal} noBackdrop={noBackdrop}>{content}</Modal>;
    }, [content, hideModal, noBackdrop]);

    return { showModal, hideModal, ModalRenderer };
}
