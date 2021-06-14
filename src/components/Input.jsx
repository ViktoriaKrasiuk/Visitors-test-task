import {useState} from 'react';
import './Input.scss';
import '../index.scss';


export const Input = (props) => {

  const [activeInput, setActiveInput] = useState(false);
  let wrapperClassName = activeInput ? "input-wrapper active-wrapper"  : "input-wrapper"
  if (props.value) wrapperClassName += " input-has-value"
  
  

  return (
  <div className={ wrapperClassName}>   
    <input 
      id={props.id}       
      name={props.name} 
      type='text' 
      value={props.value} 
      onChange={props.handleInputChange} 
      onFocus={(e) => {setActiveInput(true)}}
      onBlur={(e) => {setActiveInput(false)}}
      autoFocus={props.autoFocus}
    />                
    <label className={props.value? 'has-value' : ""} >{props.labelName}<span className="required">*</span></label> 
  </div>    
)}



                 