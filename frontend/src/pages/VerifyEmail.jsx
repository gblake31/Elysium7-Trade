import React, {useEffect} from 'react';
import './Profile.css';

function VerifyEmail()
{
    let bp = require('../components/Leinecker/Path.js');

    useEffect(() => {
      verify();
      }, []);
    
    const verify = async () => 
    {
      try
      {
        let temp = window.location.href.split("/");
        let id = temp[temp.length - 1];
        console.log(id);
        const response = await fetch(bp.buildPath('api/verify/'+id),
        {method:'POST',headers:{'Content-Type': 'application/json'}});
        let res = JSON.parse(await response.text());
        try
        {
          if(res.error.length > 0)
          {
            console.log(res.error);
            return;
          }
        }
        catch(e)
        {
          console.log('Something Went Wrong Trying to verify');
        }
        
      }
      catch(e)
      {
        console.log(e.toString());
        return;
      }  
    }  
        
    return(
        <main>
          <h1 id = "verified-text">You're verified. You can close this page</h1>
        </main>
    );
    
}

export default VerifyEmail;