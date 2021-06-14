import {useState, useEffect} from 'react';

import VisitorCard from './VisitorCard';
import EmptyCard from './EmptyCard';
import {Modal} from './Modal';
import {VisitorForm} from './VisitorForm';
import {Input} from './Input';
import {Button} from './Button';
import UserNotification from './UserNotification';

import './VisitorsPage.scss';
import '../index.scss';


const VisitorsPage = () => {

  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitors, setVisitors] = useState([]);
  const [updatedIndex, setUpdatedIndex] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateNotification, setShowCreateNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);



   const toShowModal = (setShow) => {
    setShow(true);
   };

   const toHideNotification = (setShow) => {
    setShow(false);
   };

   const toShowCreateNotification = () => {
    setShowCreateNotification(true);
   };

   
   const toShowUpdateNotification = () => {
    setShowUpdateNotification(true);
   };

   const toShowCreateModal = () => {
    toShowModal(setShowCreateModal);
   };

   const toShowUpdateModal = (item, index) => {
    toShowModal(setShowUpdateModal);
    setVisitorName(item.name);
    setVisitorEmail(item.email);
    setUpdatedIndex(index);
   };

   const toHideModal = (e) => {
    if (e.target.className === 'modalWrapper'){
      setShowCreateModal(false);
      setShowUpdateModal(false); 
      setVisitorName('');
      setVisitorEmail('');     
    }
   };

   const onSubmit = (e) => {
    e.preventDefault();
    if (visitorName === '' || visitorEmail === ''){
      setShowErrorNotification(true);
    } else {
      setVisitors(
        [...visitors, {name: visitorName, email: visitorEmail, id: Math.random()}]
      );
      setVisitorName('');
      setVisitorEmail('');
      setShowCreateModal(false);
      toShowCreateNotification();
      toCreateList(visitors);
    }    
   };

   const onChange = (e) => {
    setVisitorName(e.target.value);
   };

   const toDeleteCard = (i) => {  
    visitors.splice(i, 1);
    setVisitors([...visitors]);    
    toCreateList(visitors);
  };

  const toUpdateCard = (e) => {
    e.preventDefault();
    setShowUpdateModal(false);
    toShowUpdateNotification();
    let listClone = Object.assign(visitors);
    let index = updatedIndex;
    listClone[index].name = visitorName;
    listClone[index].email = visitorEmail;
    setVisitorName('');
    setVisitorEmail('');
    toCreateList(listClone);
  };

   const toCreateList = (visitors) => {
     return ( visitors.map ( (i, index) => {
       return (
         <>
           <li key={Math.random()}>
              <VisitorCard 
              name={i.name} 
              email={i.email} 
              openUpdateModal={() => toShowUpdateModal(i, index)} 
              deleteCard={() => toDeleteCard(index)}
              />
           </li>
         </>
       )
     })
     )
   }

   useEffect(() => {
    document.addEventListener('keydown', (e) =>{
      if(e.code === 'Escape'){
        setShowCreateModal(false);
        setShowUpdateModal(false);
        setVisitorName('');
        setVisitorEmail('');        
      }
    });
    }, []);

    useEffect(() => {
      toCreateList(visitors)      
    },[]);

    useEffect( () =>{
      setTimeout(setShowCreateNotification, 900, false)    
    }, [showCreateNotification]);

    useEffect( () =>{
      setTimeout(setShowUpdateNotification, 900, false)    
    }, [showUpdateNotification]);
   
    useEffect( () =>{
      setTimeout(setShowErrorNotification, 900, false)    
    }, [showErrorNotification]);
  return(
  <>
      {
        !visitors.length ?
        <>
        <EmptyCard/>
        <Button name="Add new" onClick={toShowCreateModal}/>
       </>
      :
      <>
       <ul>
        {toCreateList(visitors)}
        </ul>
        <Button name="Add new" onClick={toShowCreateModal}/> 
        </>
      }
      {
        showCreateModal ?
          <Modal onClick={toHideModal}>
            <VisitorForm headerName='Add new visitor' onSubmitHandler={onSubmit}>
              <Input 
              id="name"
              autoFocus={true}
              name="name"
              labelName="Name" 
              value={visitorName}
              handleInputChange={onChange}
              />
              <Input 
              id="email"
              name="email" 
              labelName="Email"
              value={visitorEmail}
              handleInputChange={(e) => {setVisitorEmail(e.target.value)}}
              
              />
            </VisitorForm>
          </Modal>
        :
        null
      }
      {
        showUpdateModal ?
          <Modal onClick={toHideModal}>
          <VisitorForm headerName='Update visitor' onSubmitHandler={toUpdateCard}>
            <Input 
            id="name"
            autoFocus={true}
            
            name="name"
            labelName="Name*" 
            value={visitorName}
            handleInputChange={(e) => {setVisitorName(e.currentTarget.value)}}
            />
            <Input
              id="email"
              name="email" 
              labelName="Email*"
              value={visitorEmail}
              handleInputChange={(e) => {setVisitorEmail( e.target.value)}}
            />
          </VisitorForm>
          </Modal>
        :
        null
      }
      {      
        showCreateNotification?
         <UserNotification
         className='checkedIcon' 
          onClick={() => toHideNotification(setShowCreateNotification)} 
          notification="New visitor added!"
         />
        : null
      }     
      {
        showUpdateNotification? 
         <UserNotification 
          className='checkedIcon' 
          onClick={() => toHideNotification(setShowUpdateNotification)} 
          notification="Visitor was updated!"
         />
        : null
      } 
      {
        showErrorNotification? 
         <UserNotification 
          onClick={() => toHideNotification(setShowErrorNotification)} 
          notification="Form is invalid!"
         />
        : null
      }
     </>
    
  )
}
export default VisitorsPage;