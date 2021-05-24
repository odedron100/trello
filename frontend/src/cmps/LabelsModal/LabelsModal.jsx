

import './LabelsModal.scss'

export const LabelsModal = (props) => {

    return (
        <div className="label-modal" ref={props.sideBarModalRef}>
            <div className="modal-label-header">Labels</div>
            <input type="text" placeholder="Search labels..."/>
            <div className="labels">
                <header>labels</header>
                <div className="green color" onClick={((e) => props.updateLabelsCard(e,'#61bd4f'))}></div>
                <div className="yellow color" onClick={((e) => props.updateLabelsCard(e,'#f2d600'))}></div>
                <div className="orange color" onClick={((e) => props.updateLabelsCard(e,'#ff9f1a'))}></div>
                <div className="red color" onClick={((e) => props.updateLabelsCard(e,'#eb5a46'))}></div>
                <div className="purple color" onClick={((e) => props.updateLabelsCard(e,'#c377e0'))}></div>
                <div className="blue color" onClick={((e) => props.updateLabelsCard(e,'#0079bf'))}></div>
            </div>
        </div>
    )
}
