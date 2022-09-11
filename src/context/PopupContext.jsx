import { createContext, useState } from "react"
import { DeletePopup } from "../components/DeletePopup";
import { DrawStartPage } from "../components/DrawStartPopup";
import { MiniButton } from "../components/MiniButton";
import { PopupPage } from "../Pages/PopupPage";

export const popupContext = createContext();


export const PopupContext = ({children}) =>
{
    const [showPopup, setShowPopup] = useState(false);
    const [popupItem, setPopupItem] = useState("");
    const [itemForModify, setItemForModify] = useState({});
    const [confirmItem, setConfirmItem] = useState(false);

    const [refresh, setrefresh] = useState(false);

    return(
        
        <popupContext.Provider value={{refresh, setrefresh, setShowPopup, setPopupItem, itemForModify, setItemForModify}} >
            { children  }
            {
                showPopup 
                &&
                <PopupPage>
                {   popupItem == "ConfirmationModalDelete" && <DeletePopup/> }
                {   popupItem == "DrawStartModal" && <DrawStartPage/> }
                </PopupPage> 
            }
       </popupContext.Provider>
    
    )
}