import {removeList} from '../../store/actions/ListActions'
import { useDispatch } from 'react-redux';
import './HelpersModal.scss'
import { useCallback, useEffect, useRef } from 'react';

export const HelpersModal = (props) => {
    const dispatch = useDispatch();
    const helperModalRef = useRef(null);

     const handleDocumentClick = useCallback((e) => {
         console.log('e.path[0]', e.path[0]);
         console.log('e.path[1]', e.path[1]);
         console.log('e.path[2]', e.path[2]);
         console.log('e.target', e.target);
        if (e.path[0] === helperModalRef.current
            || e.path[1] === helperModalRef.current
            || e.path[2] === helperModalRef.current
            || e.target === helperModalRef.current) {
            return;
        }

        if (props.isOpenHelpersModal) {
            props.setIsOpenHelpersModal(false)
        }

        // if (!formContainerRef.current.contains(e.target)) {
        //     setIsItemFormOpen(false);
        // }
    }, [helperModalRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    const onRemoveList = () => {
        dispatch(removeList(props.list._id))
    }

    return (
       <div className="helpers-modal" ref={helperModalRef}>
            <div className="modal-helpers-header">List Helpers...</div>
            <div className="remove-list item" onClick={onRemoveList}>Remove list</div>
        </div>
    )
}
