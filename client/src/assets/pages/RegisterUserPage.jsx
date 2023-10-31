import { useState } from "react";
import axios from "axios";
import {link} from "../../link.jsx"
import Yeti from "../profile-icons/yeti.jpeg"
import Forest from "../profile-icons/forest.jpeg"
import Sea from "../profile-icons/sea.jpeg"
import Alien from "../profile-icons/alien.jpeg"
import {useNavigate} from "react-router-dom"

function RegisterUserPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [activeIcon, setactiveIcon] = useState(-1)
  const navigate = useNavigate();

  const profileIcons = [Yeti, Forest, Sea, Alien];

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
            profilePicture: profileIcons[activeIcon]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 200){
          alert('Registration Succesful');
          navigate('/login');
        }else{
          alert('Registration Failed')
        }
    } catch (error) {
        if(error.response.status === 409){
          let errorMessage = '';
          for (const key in error.response.data) {
            errorMessage += `Please try with a different ${key}: the value ${error.response.data[key]} is already in use\n`;
          }
          alert(errorMessage);
        }
        console.error(error);
    }
  }

  const handleIconSelect = (index) => {
    setactiveIcon(index);
  }

  return (
    <form className="form-register-user" onSubmit={handleSubmit}>
      <h1>New User</h1>
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
      <h2>Select your pofile icon!</h2>
      <ul className="profile-icon-list">
        {profileIcons.map((icon, index) => {
            return (
              <li className={`profile-list-item ${activeIcon === index ? "active-list-icon" : ""}`} onClick={() => handleIconSelect(index)} key={index}>
                <img src={icon} className="profile-icon" />
              </li>
            )
          }
        )}
      </ul>
      <button>Register</button>
    </form>
  )
}

export default RegisterUserPage;
