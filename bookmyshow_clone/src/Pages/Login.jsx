import React,{ useState} from 'react'
import loginpic from './images/loginimage.png'
import { NavLink,useHistory } from 'react-router-dom'
// import Loginform from './Loginform'


const Login = () => {


    const history= useHistory()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const loginUser = async (e)=>{
         e.preventDefault();

        const res= await fetch('/signin', {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        })

        const data= res.json();
        if(res.status===400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            // dispatch({type:"USER",payload:true })

            window.alert("you are logging in")

            history.push('/')
        }
    }

    return (
        <>
           <section className="signin">
            <div className="mt-5">
                <div className="signin-content">
                <div className="signin-image">
                            <figure>
                                <img src={loginpic} alt="login pic" />
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Create Account</NavLink>
                        </div>
                    <div className="signin-form">
                        <h2 className="form-title">Log In</h2>
                        <form method='POST' className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                <i class="zmdi zmdi-email"></i>
                                </label>
                                <input type="email" name="email" id="email" autoComplete="off" placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>setemail(e.target.value)} />
                            </div>
                            
                            
                            <div className="form-group">
                                <label htmlFor="password">
                                <i class="zmdi zmdi-lock"></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter your password"
                                value={password}
                                onChange={(e)=>setpassword(e.target.value)} />
                            </div>
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log In"
                                onClick={loginUser}/>
                            </div>
                        </form>
                    </div>     
                        
                    </div>
                </div>
            </section> 
        </>
    )
}

export default Login
