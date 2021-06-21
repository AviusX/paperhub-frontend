import { useRef, useEffect } from 'react';

const useDidMount = () => {
    const mountRef = useRef(true);
    useEffect(() => {
        mountRef.current = false;
    }, []);
    return mountRef.current;
}

export default useDidMount;