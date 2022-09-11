import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "../../components/ActivityInicator";
import { Button } from "../../components/Button";
import { CardContainer } from "../../components/CardContainer";
import { Input } from "../../components/Input";
import { PromotionCard } from "../../components/PromotionCard";
import { ScrowView } from "../../components/ScrowView";
import { SubmitFile } from "../../components/SubmitFile";
import { TextArea } from "../../components/TextArea";
import { popupContext } from "../../context/PopupContext";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { isEmptyOrSpaces } from "../../utils/Validators";
import "./styles.css";

export const promotionPageContext = createContext();

export const PromotionsPage = ()=>
{
    const [editMode, setEditMode] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [message, setMessage] = useState("");

    const [promotionId, setPromotionId] = useState("")
    const [promotionName, setPromotionName] = useState("");
    const [description, setDescription] = useState("");
    const [filePath, setFilePath] = useState("");

    const [promotionItems, setPromotionItems] = useState([]);

    const { refresh } = useContext(popupContext);

    function clearData()
    {
        setEditMode(false);
        setPromotionId("");
        setDescription("");
        setPromotionName("");
        setFilePath("");
    }

    async function getItems()
    {
        setLoadingItems(true);

        const response = await ApiAccess.get(ApiURIs.promotions.getAll);

        setPromotionItems(response.data.promotions);

        setLoadingItems(false);
    }

    async function handleSubmit()
    {
        
        if(isEmptyOrSpaces(promotionName) || isEmptyOrSpaces(description) )
        {
            setMessage("alguns campos estão vazios !");
            return;
        }

        setLoadingSubmit(true);

        const formData = new FormData();
        
        if(filePath)
            formData.append("file", filePath);
        
        formData.append("description", description);
        
        formData.append("promotionName", promotionName);

        if(editMode)
        {
            const response = await ApiAccess.put(ApiURIs.promotions.update + `${promotionId}`, formData);
            setMessage(response.data.message);
            setEditMode(false)
        }
        else
        {
            const response = await ApiAccess.post(ApiURIs.promotions.create, formData);
            setMessage(response.data.message);
        }
        
        clearData();

        setLoadingSubmit(false);

        await getItems();
        
    }


    useEffect(()=>{ getItems() }, []);
    useEffect(()=>{ getItems() }, [refresh]);

    function handleDisableEditMode()
    {
        setEditMode(false);
        setDescription("");
        setPromotionName("");
    }

    return (
        <div className="PromotionsPage">
            <CardContainer title={'Cadastrar Promoções'} >
                <span id="info">Prencha as informações necessarias para fazer a adição de novos items ao cardápio</span>
                <span id="alert" >Campos marcados com * são obrigatorios</span>

                <Input
                    inputDataValue={promotionName}
                    setInputData={setPromotionName}
                    placeholder={'Titulo*'}
                    type={'text'}
                />

                <TextArea
                    inputDataValue={description}
                    setInputData={setDescription}
                    placeholder={'Descrição*'}
                />

                <SubmitFile
                    setFilePath={setFilePath}
                    
                />

                { message != "" && <span id="alert-error" >{message}</span> }

                {
                    loadingSubmit ? <ActivityIndicator/>:
                    <div className="ButtonActions">
                        <Button
                            text={'Salvar'} 
                            bgColor={'var(--primary)'} t
                            textColor={'white'}
                            pressAction={()=>{ handleSubmit() }}
                        />

                        {
                            editMode &&
                            <Button
                                text={'Cancelar'} 
                                bgColor={'var(--border'} 
                                textColor={'black'} 
                                pressAction = {()=>{ handleDisableEditMode() }}
                            />  
                        }
                        
                    </div>
                }

            </CardContainer>

            <CardContainer title={'Promoções Cadastradas'}>
                <promotionPageContext.Provider 
                    value = {
                        {
                            setPromotionId,
                            setEditMode, 
                            setPromotionName, 
                            setDescription
                        }
                    } 
                >
                    <ScrowView>
                    {
                        loadingItems ? <ActivityIndicator/>
                        :
                        promotionItems.map((item)=>
                        {
                            return <PromotionCard 
                                key={item._id}  
                                _id={item._id}
                                promotionName={item.promotionName}
                                description={item.description}
                                referenceImageUrl={item.referenceImageUrl}
                                />
                        })
                    }
                     </ScrowView>
                </promotionPageContext.Provider>
            </CardContainer>
        </div>
    )
}