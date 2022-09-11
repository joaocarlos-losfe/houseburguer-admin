import { Button } from "../../components/Button";
import { CardContainer } from "../../components/CardContainer";
import { Input } from "../../components/Input";
import "./styles.css";

import imgLogin from "../../assets/undraw_login.svg";
import { useState } from "react";

import { ActivityIndicator } from "../../components/ActivityInicator";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { isEmptyOrSpaces } from "../../utils/Validators";


export const LoginPage = ( {setLoginState} ) =>
{
    const [loadingLogin, setLoadingLogin] = useState(false);

    const [message, setMessage] = useState("");
    
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin()
    {
        if( isEmptyOrSpaces(userName) || isEmptyOrSpaces(password))
        {
            setMessage("Um ou mais campos estão vazios !");
            return;
        }

        setLoadingLogin(true);

        const response = await ApiAccess.put(ApiURIs.admin.login, {userName, password});

        if(response.data.admin)
            setLoginState(true);
        
        setMessage(response.data.message)

        setLoadingLogin(false);
    }

    return (
        <div className="LoginPage">

            <CardContainer title={'House Burguer Login'}>
                <form>
                    <img src={imgLogin} />

                    { message != "" && <span>{message}</span> }

                    {
                        loadingLogin ? <ActivityIndicator/>
                        :
                        <>
                        <Input 
                        type={'text'} 
                        placeholder={'Usuário'}
                        inputDataValue={userName}
                        setInputData={setUserName}
                        />
                        <Input 
                            type={'password'} 
                            placeholder={'senha'}
                            inputDataValue={password}
                            setInputData={setPassword}
                            />

                        <div className="ButtonAction">
                            <Button 
                                text={'Entrar'} 
                                bgColor={('var(--primary)')} 
                                textColor={'white'}
                                pressAction={()=>{handleLogin()}}
                            />
                        </div>
                        </>
                    }

                </form>
            </CardContainer>
        </div>
    )
}