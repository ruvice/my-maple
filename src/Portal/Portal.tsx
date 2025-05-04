// components/Portal.tsx
import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactNode }) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setContainer(document.getElementById('portal-root'));
    }, []);

    if (!container) return null;
    return createPortal(children, container);
}
