

import { useCallback, useEffect } from 'react';
import './CloseModals.scss'

export const CloseModals = (props) => {

     const handleDocumentClick = useCallback((e) => {
        if(e.path[0] === props.cardModalRef.current
            || e.path[1] === props.cardModalRef.current
            || e.path[2] === props.cardModalRef.current
            || e.target === props.cardModalRef.current){
            props.setWhichSideBarModalOpen('')
        }

        if (e.target === props.cardModalRef.current) {
            return;
        }


            if (e.target === props.cardModalContaiinerRef.current) {
                props.setIsOpenModal(false);
            }
        }, [props.cardModalRef, props.cardModalContaiinerRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    return (
        <div>

        </div>
    )
}
