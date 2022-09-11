import { useContext } from "react";
import { popupContext } from "../../context/PopupContext";
import { MiniButton } from "../MiniButton";
import "./styles.css";

export const HeaderPopup = ( {title} ) =>
{
   const { setShowPopup} = useContext(popupContext);


    return (
        <div className="HeaderPopup">
            <h1>{title}</h1>
            <MiniButton iconName={'AiOutlineClose'} actionOnPress={()=>{ setShowPopup(false)}} />
        </div>
    )
}