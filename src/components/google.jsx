import React from 'react';
import GoogleLogin from 'react-google-login';


function Google(){
    
    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj); // para cookies
    };

    return (
        <div className='flex justify-center p-2'>
            <GoogleLogin
                clientId="370902738016-r7a2395e65f97qtqb4laoaoul41mpgms.apps.googleusercontent.com"
                render={renderProps => (
                    <button  className='border-none font-bold bg-red-600 rounded-full py-2 px-6  text-white hover:bg-white hover:text-red-600'onClick={renderProps.onClick} disabled={renderProps.disabled}><i className='fab fa-google pr-2'/> Google</button>
                )}
                // buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Google;