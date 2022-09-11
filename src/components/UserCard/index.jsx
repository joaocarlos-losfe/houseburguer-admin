import { useContext } from "react";
import { popupContext } from "../../context/PopupContext";
import { clientPageContext } from "../../Pages/Client";
import { MiniButton } from "../MiniButton";
import "./styles.css";


export const UserCard = ({_id, fullName, level, recentPurchase, phone, city, referencyPoint}) =>
{
    const {setEditMode, setCurrentPurchase, setFullName, setPhone} = useContext( clientPageContext );

    const { setShowPopup, setPopupItem,  setItemForModify } = useContext ( popupContext );

    function editItem()
    {
       setEditMode(true);
       setCurrentPurchase(recentPurchase);
       setFullName(fullName);
       setPhone(phone);
    }

    function excludeItem()
    {
        setItemForModify({context: 'user', item: _id});
        setPopupItem("ConfirmationModalDelete");
        setShowPopup(true);
    }
    
    return (
        <div className="UserCard">
            <div className="Top">
                <h1>{fullName}</h1>

                <div className="CardActions">
                    <MiniButton iconName={'AiOutlineEdit'} actionOnPress={()=> { editItem()  }}/>
                    <MiniButton iconName={'AiOutlineDelete'} actionOnPress={()=>{ excludeItem() }}/>
                </div>
            </div>

            <div className="CardData">
                <div className="Item">
                    <span>nivel: <h2>{ level }</h2></span>
                </div>

                <div className="Item">
                    <span>compras recentes: <h2> { recentPurchase } </h2> </span>
                </div>

                <div className="Item">
                    <span>telefone: <h2> {phone} </h2> </span>
                </div>

                {
                    !city ? <h3>cliente ainda não ativo</h3>
                    :
                    <>
                    <div className="Item">
                        <span>cidade/bairro: <h2>{city}</h2></span>
                    </div>

                    <div className="Item">
                        <span>rua/ponto de referencia: <h2>{referencyPoint}</h2> </span>
                    </div>
                    </> 
                }

            </div>

        </div>
    )
}