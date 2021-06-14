import './VisitorCard.scss'
import '../index.scss';

const VisitorCard = (props) => {
  return (
    <div className='listItem'>
      <div className='visitorInfo'>
        <div className='visitorName' title='Name'>{props.name}</div>
        <div className='visitorEmail' title='Name'>{props.email}</div>
      </div>
      <div className="btnWrapper">
        <button onClick={props.deleteCard} className='deleteCard' title='Delete'>Delete</button>
        <button onClick={props.openUpdateModal} className='updateCard' title='Update'>Update</button>
      </div>            
    </div>
  )
}

export default VisitorCard;