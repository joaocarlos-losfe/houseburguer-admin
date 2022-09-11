import { useContext } from "react";
import { popupContext } from "../../context/PopupContext";
import { promotionPageContext } from "../../Pages/Promotions";
import { MiniButton } from "../MiniButton";
import "./styles.css";

export const PromotionCard = ({_id, promotionName, description, referenceImageUrl}) =>
{
    const { 
        setShowPopup, 
        setPopupItem,  
        setItemForModify 
    } = useContext ( popupContext );

    const {
        setPromotionId,
        setEditMode, 
        setPromotionName, 
        setDescription
    } = useContext ( promotionPageContext ) 

    function editItem()
    {
        setEditMode(true);
        setPromotionId(_id);
        setPromotionName(promotionName);
        
        if(description)
            setDescription(description);
    }

    function excludeItem ()
    {
        setItemForModify({context: 'promotions', item: _id});
        setPopupItem("ConfirmationModalDelete");
        setShowPopup(true);
    }

    return (
        <div className="PromotionCard">
            <div className="Top">
                <h1>{promotionName}</h1>
                <div className="CardActions">
                    <MiniButton iconName={'AiOutlineEdit'} actionOnPress={()=> { editItem() }}/>
                    <MiniButton iconName={'AiOutlineDelete'} actionOnPress={()=>{ excludeItem() }}/>
                </div>
            </div>

            <div className="CardData">
                {referenceImageUrl && <img src={referenceImageUrl} alt="burguer figure" />}
                
                <div className="Data">
                    { description &&  <h2> <span>Descrição: </span> {description}</h2> }
                </div>

            </div>

        </div>
    )
}