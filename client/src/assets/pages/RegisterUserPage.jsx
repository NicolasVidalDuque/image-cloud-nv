import { useState } from "react";
import axios from "axios";
import {link} from "../../link.jsx"
function RegisterUserPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const validPassword = (p) => {
    if (p.length < 8){
      return false;
    }
    return true
  }

  const validUsername = (u) => {
    if (u.length < 6){
      return false;
    }
    return true
  }

  const validForm = (p,u) => {
    console.log({p,u})
    if (!validUsername(u)) {return false};
    if (!validPassword(p)) {return false};
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(link + 'register', {
            username: username,
            password: password,
            email: email,
            profilePicture: 'aoeu'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        alert(`Registration ${response.status === 200 ? "Succesfull" : "Falied"}`)
    } catch (error) {
        // Handle any errors here
        console.error(error);
    }
  }

  return (
    <form className="form-register-user" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text"
        placeholder="Username"
        required
        value={username}
        onChange={ev => 
          setUsername(ev.target.value)
        }
      />
      <input type="password"
        placeholder="Password"
        value={password}
        required
        onChange={ev => 
          setPassword(ev.target.value)
        }
      />
      <input type="email"
        placeholder="yourEmail@host.com"
        value={email}
        required
        onChange={ev => 
          setEmail(ev.target.value)
        }
      />
      <button>Register</button>
    </form>
  )
}

export default RegisterUserPage;
