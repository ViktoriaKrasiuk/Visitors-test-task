import './Modal.scss'
import '../index.scss';

export const Modal = (props) => {
        
    return(
        <div className='modalWrapper' onClick={props.onClick}>
            <div className="modalBody" onClick={props.onClick}>
                {props.children}
            </div>
        </div>
    )
}