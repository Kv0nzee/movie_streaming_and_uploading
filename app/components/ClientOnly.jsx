'use client';

import {  useEffect, useState } from "react";

import InfoModal from "./InfoModal";
import useInfoModalStore from '../hooks/useInfoModalStore';

const ClientOnly = ({
    children,
    currentUser
}) => {
    const [hasMounted, setHasMounted] = useState(false);
    const {isOpen, closeModal} = useInfoModalStore();
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted){
        return null;
    }

    return (  
        <>
        <InfoModal visible={isOpen} onClose={closeModal} currentUser={currentUser}/>
            {children}
        </>
    );
}
 
export default ClientOnly;