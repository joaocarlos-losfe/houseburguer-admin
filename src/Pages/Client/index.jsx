import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "../../components/ActivityInicator";
import { Button } from "../../components/Button";
import { CardContainer } from "../../components/CardContainer";
import { Input } from "../../components/Input";
import { ScrowView } from "../../components/ScrowView";
import { UserCard } from "../../components/UserCard";
import { popupContext } from "../../context/PopupContext";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { isEmptyOrSpaces, validPhone } from "../../utils/Validators";

import "./styles.css";

export const clientPageContext = createContext();

export const ClientPage = ()=>
{
    //user interface
    const [editMode, setEditMode] = useState(false);

    const [savingLoading, setSavingLoading] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [message, setMessage] = useState("");
    
    //data
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPurchase, setCurrentPurchase] = useState(0);
    
    const { refresh } = useContext(popupContext);

    async function loadingUsersData()
    {
        setLoadingUsers(true);
        const response = await ApiAccess.get(ApiURIs.users.getAll);
        setUsers(response.data.user);
        setLoadingUsers(false);
    }


    async function submitData()
    {
        
        if(isEmptyOrSpaces(fullName) || isEmptyOrSpaces(phone))
        {
            setMessage("Alguns campos estão vazios !");
            return;
        }

        if(!validPhone(phone))
        {
            setMessage("telefone invalido !");
            return;
        }

        setSavingLoading(true);

        if(editMode)
        {
            const response = await ApiAccess.put(`${ApiURIs.users.update}${phone}`,
            {
                currentPurchase,
                fullName,
                phone
            })

            setMessage(response.data.message);
            await loadingUsersData();
            setEditMode(false);
            setFullName("");
            setPhone("");
        }
        else
        {
            const response = await ApiAccess.post(ApiURIs.users.create, { fullName, phone });
            setMessage(response.data.message);

            await loadingUsersData();
            setFullName("");
            setPhone("");

        }

        setSavingLoading(false);
    }


    function disableEditMode()
    {
        setEditMode(false);
        setFullName("");
        setPhone("");
    }

    
    useEffect(()=>{ loadingUsersData() }, []);

    useEffect(()=>{ loadingUsersData() }, [refresh])
    

    return (
        <div className="ClientPage">
            <CardContainer title={'Pré cadastrar cliente'}>

                <span id="info">Prencha as informações necessarias para fazer a adição de novas promoções</span>
                <span id="alert" >Campos marcados com * são obrigatorios</span>

                { 
                    editMode && 
                    <Input 
                        placeholder={'Total de compras*'} 
                        type={'number'} 
                        inputDataValue={currentPurchase} 
                        setInputData={setCurrentPurchase}
                    /> 
                }

                <Input 
                    placeholder={'Nome completo*'} 
                    type={'text'} 
                    inputDataValue={fullName} 
                    setInputData={setFullName}
                />

                <Input placeholder={'Whatsapp*'} 
                    type={'tel'}
                    inputDataValue={phone}
                    setInputData={setPhone}
                />

                { message != "" && <span id="alert-error" >{message}</span> }

                {
                    savingLoading? <ActivityIndicator/>
                    : 
                    <div className="ButtonActions">
                        <Button 
                            text={'Salvar'} 
                            bgColor={'var(--primary)'} t
                            textColor={'white'}
                            pressAction={submitData}
                        />
                        {
                            editMode == true && 
                            <Button
                                text={'Cancelar'} 
                                bgColor={'var(--border'} 
                                textColor={'black'} 
                                pressAction = { ()=>{disableEditMode()} }
                            /> 
                        }
                    </div>
                }

            </CardContainer>

            <clientPageContext.Provider value={{setEditMode, setCurrentPurchase, setFullName, setPhone}} >
            
                <CardContainer title={'Clientes cadastrados'} >
                {
                    loadingUsers ? <ActivityIndicator/>
                    :
                    <ScrowView>
                    {
                        users.map((user) => 
                        {
                            return <UserCard 
                                key={user._id} 
                                _id={user._id}
                                fullName={user.fullName} 
                                level={user.level}
                                recentPurchase={user.currentPurchase}
                                phone={user.phone}
                                city={user.city}
                                referencyPoint={user.referencyPoint}
                            />
                        })
                    }
                    </ScrowView>
                }
                </CardContainer>

            </clientPageContext.Provider>

        </div>
    )
}