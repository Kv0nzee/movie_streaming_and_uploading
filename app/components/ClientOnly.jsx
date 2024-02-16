'use client';

import {  useEffect, useState } from "react";

import InfoModal from "./InfoModal";
import useInfoModalStore from '../hooks/useInfoModalStore';

const ClientOnly = ({
    children,
    currentUser
}) => {
    // State variable to track if the component has mounted
    const [hasMounted, setHasMounted] = useState(false);
    const {isOpen, closeModal} = useInfoModalStore();

    //set hasMounted to true after component mount
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // If the component has not mounted 
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