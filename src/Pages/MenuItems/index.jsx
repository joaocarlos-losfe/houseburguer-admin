import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "../../components/ActivityInicator";
import { Button } from "../../components/Button";
import { CardContainer } from "../../components/CardContainer";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { SubmitFile } from "../../components/SubmitFile";
import { TextArea } from "../../components/TextArea";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { isEmptyOrSpaces } from "../../utils/Validators";
import "./styles.css";

import { ScrowView } from "../../components/ScrowView";
import { ItemCard } from "../../components/ItemCard";
import { popupContext } from "../../context/PopupContext";

export const menuItemsContext = createContext();

export const MenuItemsPage = ()=>
{
    const [editMode, setEditMode] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [message, setMessage] = useState("");

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Lanche");
    const [filePath, setFilePath] = useState("");
    const [itemIdForEdit, setItemIdForEdit] = useState(undefined);

    const [items, setItems] = useState([]);

    const { refresh } = useContext(popupContext);

    function clearData()
    {
        setEditMode(false);
        setItemName("");
        setDescription("");
        setPrice("");
        setCategory("Lanche");
        setFilePath("");
        setItemIdForEdit(undefined);
    }

    async function getItems()
    {
        setLoadingItems(true);
        const response = await ApiAccess.get(ApiURIs.menuItems.getAll);
        setItems(response.data.item);
        setLoadingItems(false);
    }

    async function submitItems()
    {
        const formData = new FormData();

        try
        {
            if(isEmptyOrSpaces(itemName) || isEmptyOrSpaces(price.toString()))
            {
                setMessage("Alguns campos estão vazios !");
                return;
            }

            setLoadingSubmit(true);

            formData.append("price", price);
            formData.append("itemName", itemName)
            formData.append("category", category);

            if(filePath != "")
                formData.append("file", filePath);
            
            if(description != "")
                formData.append("description", description);

            let response = undefined;

            if(editMode)
            {
                response = await ApiAccess.put(ApiURIs.menuItems.update + `${itemIdForEdit}`, formData)
            }
            else
            {
                response = await ApiAccess.post(ApiURIs.menuItems.create, formData);
            }

            setMessage(response.data.message);

            await getItems();

            setItemName("");
            setPrice("");
            setDescription("");
            setCategory("Lanche");
        }
        catch (exption)
        {
            setMessage('Item já existente. Verifique a descrição ou o nome do item')
        }

        clearData();

        setLoadingSubmit(false);
    }

    
    useEffect(()=>{ getItems() }, []);

    useEffect(()=>{ getItems() }, [refresh])

    return (
        <div className="MenuItemsPage">
            <CardContainer title={"Adicionar itens"} >

                <span id="info">Prencha as informações necessarias para fazer a adição de novos items ao cardápio</span>
                <span id="alert" >Campos marcados com * são obrigatorios</span>

                <Input
                    placeholder={'Nome do item*'}
                    type={'text'}
                    inputDataValue={itemName}
                    setInputData={setItemName}
                />

                <Input
                    placeholder={'Preço* R$'}
                    type={'number'}
                    inputDataValue={price}
                    setInputData={setPrice}
                />

                <TextArea
                    placeholder={'Descrição'}
                    inputDataValue={description}
                    setInputData={setDescription}
                />

                <Select
                    firstvalue={category}
                    placeholder={'Categoria*'}
                    options={["Lanche", "Bebida", "Acompanhamento"]}
                    setInputData={setCategory}
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
                            pressAction={()=>{ submitItems() }}
                        />

                        {
                            editMode &&
                            <Button
                            text={'Cancelar'} 
                            bgColor={'var(--border'} 
                            textColor={'black'} 
                            pressAction = {()=>{disableEditMode()}}
                        />  
                    }
                        
                     </div>
                }

            </CardContainer>

            <CardContainer title={"Itens cadastrados"}>

                <menuItemsContext.Provider 
                    value =
                    {
                        {
                            setEditMode,
                            setItemIdForEdit,
                            setItemName,
                            setCategory,
                            setDescription,
                            setPrice,
                        }
                    } >
                
                    <ScrowView>
                    {
                        loadingItems ? <ActivityIndicator/>
                        :
                        items.map((itemData)=>
                        {
                            return <ItemCard 
                                    key={itemData._id}
                                    _id={itemData._id}
                                    referenceImageUrl={itemData.referenceImageUrl}
                                    itemName={itemData.itemName}
                                    category={itemData.category}
                                    description={itemData.description}
                                    price={itemData.price}
                                    />
                        })
                    }
                    </ScrowView>

                </menuItemsContext.Provider>
            </CardContainer>

        </div>
    )
}