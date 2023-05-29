import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface NavProps {
    onPathChange: () => void;
}

export const useNavigation = ({ onPathChange }: NavProps) => {
    const { pathname } = useLocation();

    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            onPathChange();
        }
        prevPathname.current = pathname;
    }, [pathname, onPathChange]);
};
