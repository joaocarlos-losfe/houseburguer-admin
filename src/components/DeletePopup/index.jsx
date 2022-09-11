import { useContext, useState } from "react";
import { popupContext } from "../../context/PopupContext";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { ActivityIndicator } from "../ActivityInicator";
import { Button } from "../Button";
import { HeaderPopup } from "../HeaderPopup";
import "./styles.css";

export const DeletePopup = ()=>
{

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const 
    { 
        refresh,
        setrefresh,
        setShowPopup, 
        itemForModify, 
        setItemForModify 

    } = useContext(popupContext);

    async function handleDeleteItem ()
    {

        let result = undefined;

        setLoading(true);

        if(itemForModify)
        {
            switch (itemForModify.context)
            {
                case 'user': result =  await ApiAccess.delete(ApiURIs.users.delete + `${itemForModify.item}`);
                case 'menuItem': result = await ApiAccess.delete(ApiURIs.menuItems.delete + `${itemForModify.item}`);
                case 'promotions': result = await ApiAccess.delete(ApiURIs.promotions.delete + `${itemForModify.item}`)
            }
        }

    
        setItemForModify(undefined);
        setLoading(false);

        setShowPopup(false);
        setrefresh(!refresh);
    }

    function handleCancelButton()
    {
        setItemForModify(undefined);
        setShowPopup(false);
    }

    return (
        <div className="DeletePopup">
            <HeaderPopup title={"Confirmação"} />

            <div className="Actions">

                {
                    message != "" ? <h2>{message}</h2>
                    :
                    <>
                    
                    <h2>Deseja realmente excluir ?</h2>
                    {
                        loading ? <ActivityIndicator/>
                        :
                        <div className="ButtonActions">
                            <Button
                                pressAction={()=> { handleDeleteItem() } }
                                bgColor={'var(--primary)'}
                                text={('Confirmar')}
                                textColor={('white')}
                            />

                            <Button
                                pressAction={(()=>{ handleCancelButton() })}
                                bgColor={'var(--secondary)'}
                                text={('Cancelar')}
                                textColor={('white')}
                            />
                        </div>
                    }
                    
                    </>
                }
            
            </div>

        </div>
    )
}