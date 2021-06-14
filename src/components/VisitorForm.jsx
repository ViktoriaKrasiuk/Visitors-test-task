import './VisitorForm.scss';
import '../index.scss';

import {Button} from './Button'

export const VisitorForm = (props) => {
        
  return(
  <div>
      <form onSubmit={props.onSubmitHandler}>
          <div>
          <h1>{props.headerName}</h1>
          </div> 
          {props.children} 
          <div className="btnWrapper">
              <Button name="Save"></Button>              
          </div>
          
      </form>  
  </div>
  
  
  )
}