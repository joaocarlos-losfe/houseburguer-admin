import { useContext } from "react";
import { popupContext } from "../../context/PopupContext";
import { menuItemsContext } from "../../Pages/MenuItems";
import { MiniButton } from "../MiniButton";
import "./styles.css";

export const ItemCard = ({_id, referenceImageUrl, itemName, price, description, category}) =>
{
    const { 
        setShowPopup, 
        setPopupItem,  
        setItemForModify 
    } = useContext ( popupContext );
    
    const {
        setItemIdForEdit,
        setEditMode,
        setItemName,
        setCategory,
        setDescription,
        setPrice,
    } = useContext (menuItemsContext);

    function editItem()
    {
        setEditMode(true);
        setItemIdForEdit(_id);
        setItemName(itemName);
        setPrice(price);
        setCategory(category);
        if(description)
            setDescription(description)
    }

    function excludeItem ()
    {
        setItemForModify({context: 'menuItem', item: _id});
        setPopupItem("ConfirmationModalDelete");
        setShowPopup(true);
    }

    return (
        <div className="ItemCard">
            <div className="Top">
                <h1>{itemName}</h1>
                <div className="CardActions">
                    <MiniButton iconName={'AiOutlineEdit'} actionOnPress={()=> { editItem()  }}/>
                    <MiniButton iconName={'AiOutlineDelete'} actionOnPress={()=>{ excludeItem() }}/>
                </div>
            </div>

            <div className="CardData">
                {referenceImageUrl && <img src={referenceImageUrl} alt="burguer figure" />}
                
                <div className="Data">
                    <h2> <span>Preço: </span> {price}</h2>
                    { description &&  <h2> <span>Descrição: </span> {description}</h2> }
                    { category && <h2> <span>Categoria: </span> {category}</h2> }
                </div>

            </div>

        </div>
    )
}