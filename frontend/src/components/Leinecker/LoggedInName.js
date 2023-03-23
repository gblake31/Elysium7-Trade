import React from 'react';

function LoggedInName()
{
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;

    const doLogout = event => 
    {
    event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };  

  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {firstName} {lastName}</span><br />
   <button type="button" id="logoutButton" class="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );
};

export default LoggedInName;