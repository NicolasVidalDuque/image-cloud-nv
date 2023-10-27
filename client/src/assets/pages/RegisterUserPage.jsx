import { useState } from "react";
function RegisterUserPage(){
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  return (
    <form className="form-register-user" >
      <h1>Register</h1>
      <input type="text"
        placeholder="Username"
        value={username}
        onChange={event => 
          setusername(event.target.value)
        }
      />
      <input type="password"
        placeholder="Password"
        value={password}
        onChange={event => 
          setusername(event.target.value)
        }
      />
      <input type="email"
        placeholder="yourEmail@host.com"
        value={username}
        onChange={event => 
          setusername(event.target.value)
        }
      />
    </form>
  )
}

export default RegisterUserPage;
