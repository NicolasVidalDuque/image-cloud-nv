import { useContext, useState } from "react";
import axios from "axios";
import {link} from "../../link.jsx"
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom"

function RegisterUserPage(){
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(link + "login", {
        email: email,
        password: password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setUserInfo(response.data);
        navigate('/');
      } else {
        alert('Wrong credentials');
      }
      
    } catch (error) {
      // Handle any Axios or network error here
      console.error('An error occurred:', error);
    }
  }
  return (
    <form className="form-register-user" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="email"
        placeholder="yourEmail@host.com"
        value={email}
        required
        onChange={ev => 
          setEmail(ev.target.value)
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
     
      <button>Login</button>
    </form>
  )
}

export default RegisterUserPage;
