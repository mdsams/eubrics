import { userDetailsType } from './Home'
import './Login.css'

export interface loginProps {
    setDetails: (a: any) => void,
    setRegister: (a: any) => void,
    userDetails: userDetailsType | undefined
}

const Register = ({ setDetails, setRegister, userDetails }: loginProps) => {
    const RegisterHandler = () => {
        (
            async () => {
                try {
                    console.log(userDetails)

                    const response = await fetch('http://localhost:4040/user-sign-in', {
                        method: 'POST',
                        mode: 'cors',
                        body: JSON.stringify(userDetails),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const { message } = await response.json();
                    alert(message)
                    setRegister(false)
                } catch (error) {
                    throw error;
                }
            }
        )()
    }
    return (
        <div className='div1'>
            <div className='innerdiv'>
                <input onChange={(event: any) => setDetails({ ...userDetails, username: event.target.value })}
                    className='input' placeholder='username' />
                <input onChange={(event: any) => setDetails({ ...userDetails, password: event.target.value })}
                    className='input' placeholder='password' />
                <button onClick={RegisterHandler} className='button'>Register</button>
                <button onClick={() => setRegister(false)} className='button'> Close</button>
            </div>
        </div>
    )
}

export default Register