import { userDetailsType } from './Home';
import './Login.css';

export interface loginProps {
    setDetails: (a: any) => void;
    setLogin: (a: any) => void;
    userDetails: userDetailsType | undefined;
}
const Login = ({ setDetails, setLogin, userDetails }: loginProps) => {
    const LoginHandler = () => {
        (async () => {
            try {
                console.log(userDetails);

                const response = await fetch('http://localhost:4040/user-log-in', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(userDetails),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const { message, token } = await response.json();
                localStorage.setItem('token', token);
                alert(message);
                setLogin(false);
            } catch (error) {
                throw error;
            }
        })();
    };
    return (
        <div className='div1'>
            <div className='innerdiv'>
                <input
                    onChange={(event: any) =>
                        setDetails({ ...userDetails, username: event.target.value })
                    }
                    className='input'
                    placeholder='username'
                />
                <input
                    onChange={(event: any) =>
                        setDetails({ ...userDetails, password: event.target.value })
                    }
                    className='input'
                    placeholder='password'
                />{' '}
                <br />
                <button onClick={LoginHandler} className='button'>
                    Login
                </button>
                <button onClick={() => setLogin(false)} className='button'>
                    {' '}
                    Close
                </button>
            </div>
        </div>
    );
};

export default Login;
