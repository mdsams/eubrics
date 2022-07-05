import { useState, useEffect } from 'react';
import Card from '../components/card';
import Login from './Login';
import Register from './Register';

export interface userDetailsType {
    username: string;
    password: string;
}

const Home = () => {
    const [names, setNames] = useState([{}]);
    console.log(names);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [userDetails, setDetails] = useState<userDetailsType>();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:4040/get-behaviours', {
                    method: 'GET',
                    mode: 'cors',
                });
                const { data } = await response.json();
                console.log(data);
                setNames(data);
            } catch (error) {
                throw error;
            }
        })();
    }, []);

    return (
        <div className='App'>
            <div className='header'>
                ASSIGNMENT
                <div>
                    <button className='login-register-button' onClick={() => setLogin(true)}>
                        {' '}
                        Login{' '}
                    </button>
                    {login ? (
                        <Login
                            setDetails={setDetails}
                            setLogin={setLogin}
                            userDetails={userDetails}
                        ></Login>
                    ) : null}
                    <button className='login-register-button' onClick={() => setRegister(true)}>
                        {' '}
                        Register{' '}
                    </button>
                    {register ? (
                        <Register
                            setDetails={setDetails}
                            setRegister={setRegister}
                            userDetails={userDetails}
                        ></Register>
                    ) : null}
                </div>
            </div>
            {names.map((name, index) => (
                <Card name={name} key={index} />
            ))}
        </div>
    );
};

export default Home;
