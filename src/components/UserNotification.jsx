import './UserNotification.scss'

const UserNotification = (props) => {
  return (
    <div className='notificationItem'>
      <div className={props.className}></div>
      <h3 className='userNotification'>
        {props.notification}
      </h3> 
      <button onClick={props.onClick} className="notificationButton">OK</button>    
    </div>
  )
}

export default  UserNotification;