import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';

const UserForm = () => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { addUser, current, clearCurrent, clearUsers, error } = userContext;
  const { setAlert } = alertContext;

  const clearAll = () => {
    clearCurrent();
  };
  useEffect(() => {
    if (current !== null) {
      setUser(current);
    } else if (error === 'User email already exists.') {
      setAlert(error, 'danger');
      clearUsers();
    } else {
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        userRole: 'user',
        groupName: '',
        groupId: 0,
      });
    }
  }, [userContext, current]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userRole: 'user',
    groupName: '',
    groupId: 0,
  });
  const { firstName, lastName, email, userRole, groupId, groupName } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addUser(user);
    }
    if (error) {
      setAlert(error, 'danger');
    }
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      userRole: 'user',
      groupName: '',
      groupId: 0,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add User</h2>
      <input
        type='text'
        placeholder='FirstName'
        name='firstName'
        value={firstName}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='LastName'
        name='lastName'
        value={lastName}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value='Add User'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};
export default UserForm;