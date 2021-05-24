import { useState, useEffect, useRef, useCallback } from 'react';
import './FormButton.scss'

export const FormButton = (props) => {

    const [isItemFormOpen, setIsItemFormOpen] = useState(false);
    const [newItemInputValue, setNewItemInputValue] = useState('');
    const formContainerRef = useRef(null);
    const openFormButtonRef = useRef(null);


      const handleDocumentClick = useCallback((e) => {
        if (e.target === openFormButtonRef.current) {
            return;
        }

        if (!formContainerRef.current || !isItemFormOpen) {
            return;
        }

        if (!formContainerRef.current.contains(e.target)) {
            setIsItemFormOpen(false);
        }
    }, [formContainerRef, isItemFormOpen, openFormButtonRef]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    const toggleItemForm = () => {
        setIsItemFormOpen(!isItemFormOpen);
    }

    const updateItemTitle = (e) => {
        setNewItemInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        const newItem = {
            title: newItemInputValue
        };

        props.onSubmit(newItem);
        setNewItemInputValue('');
    }
    const dynamicClass = props.itemType;
    return (
        <section className="form-button-container">
            <div className={dynamicClass}>
                {isItemFormOpen ?
                    <section className="new-item-form" ref={formContainerRef}>
                     {dynamicClass === 'list' ?
                        <input autoFocus type="text" placeholder="Enter item title..." onChange={updateItemTitle} value={newItemInputValue}/>
                     :
                        <textarea autoFocus type="text" placeholder="Enter item title..." onChange={updateItemTitle} value={newItemInputValue}/>}

                        <footer>
                            <button className="add-item trello-button" onClick={onSubmit}>{`Add ${props.itemType}`}</button>
                            <button className="remove-item" onClick={toggleItemForm}><i className="fas fa-times"></i></button>
                        </footer>
                    </section>
                :
                    <button ref={openFormButtonRef} className="create-item-button" onClick={toggleItemForm}>+ Add a {props.itemType}</button>
                }
            </div>
        </section>
    )
}
