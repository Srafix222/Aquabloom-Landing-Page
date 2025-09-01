import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
    const [node, setNode] = useState<HTMLElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setEntry(entry);
                // Disconnect after first intersection to fire animation once
                if (node && observer.current) {
                    observer.current.unobserve(node);
                }
            }
        }, options);

        const { current: currentObserver } = observer;
        if (node) currentObserver.observe(node);

        return () => {
            if (currentObserver) currentObserver.disconnect();
        };
    }, [node, options]);

    return [setNode, entry] as const;
};
