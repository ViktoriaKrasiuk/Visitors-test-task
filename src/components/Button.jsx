import './Button.scss';

export const Button = (props) => {
  return (
    <button  
      className='button' 
      type={props.type} 
      onClick={props.onClick}>
      <div className='buttonText'>{props.name}</div>
    </button>
  )
}