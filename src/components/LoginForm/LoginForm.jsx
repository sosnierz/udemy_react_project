import React, { useContext, useEffect, useState } from 'react';

import block from 'bem-css-modules';
import Modal from '../Modal/Modal';
import { default as LoginFormStyles } from './LoginForm.module.scss'
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';



const style = block(LoginFormStyles);

const LoginForm = ({handleOnClose, isModalOpen}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const[validateMessage, setValidateMessage]= useState('');

    const {setUser} = useContext(StoreContext);

    const handleOnChangeLogin = ({target:{ value }}) => setLogin(value);
    const handleOnChangePassword = ({target:{ value }}) => setPassword(value);

    const handleOnCloseModal = e =>{
        e.preventDefault();
        handleOnClose();
    }

    const handleResetInput =() => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }
    const handleOnSubmit = async e => {
        e.preventDefault();
        const { data, status } = await request.post(
            '/user',
            { login, password }
        );
        if (status === 200){
            setUser(data.user);
            handleResetInput();
            handleOnClose();
        }else{
            setValidateMessage(data.message);
        }
    };

    useEffect(() => {
        if(isModalOpen){
        handleResetInput();
        }
    }, [isModalOpen])

    const validateMessageComponent = validateMessage.length ? 
    <p className={style('validate-message')}>{validateMessage}</p> : null

    return ( 
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
                <div className={style('row')}>
                <label>
                    Login:
                    <input onChange={handleOnChangeLogin} type="text" value={login} />
                </label>
                </div>
                <div className={style('row')}>
                <label>
                    Hasło:
                    <input onChange={handleOnChangePassword} type="password" value={password} />
                </label>
                </div>
                <div className={style('row')}>
                <button type='submit'>Zaloguj</button>
                <button onClick={handleOnCloseModal} type='button'>Anuluj</button>
                </div>
            </form>
        </Modal>
     );
}
 
export default LoginForm;