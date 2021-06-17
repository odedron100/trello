import {removeList, saveList} from '../../store/actions/ListActions'
import { useDispatch } from 'react-redux';
import './HelpersModal.scss'
import { useCallback, useEffect, useRef } from 'react';
import {utilService} from '../../services/util.service'

export const HelpersModal = (props) => {
    const dispatch = useDispatch();
    const helperModalRef = useRef(null);

     const handleDocumentClick = useCallback((e) => {
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

    const onCopyList = () => {
        const newList = {...props.list, cards:{...props.list.cards}}
        delete newList._id;
        // Object.keys(newList.cards).forEach( cardId => {
        //     delete newList.cards[cardId].id;
        // })
        console.log('newList', newList);
        dispatch(saveList(newList))
    }

    return (
       <div className="helpers-modal" ref={helperModalRef}>
            <div className="modal-helpers-header">List Helpers...</div>
            <div className="remove-list item" onClick={onRemoveList}>Remove list</div>
            <div className="copy-list item" onClick={onCopyList}>Copy list</div>
        </div>
    )
}
