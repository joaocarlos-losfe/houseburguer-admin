import "./styles.css";

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai"

export const MiniButton = ({iconName, actionOnPress}) =>
{
    return (
        <button key={iconName} className="MiniButton" onClick={actionOnPress} >
            {iconName == "AiOutlineEdit" && <AiOutlineEdit/>}
            {iconName == "AiOutlineDelete" && <AiOutlineDelete/>}
            {iconName == "AiOutlineClose" && <AiOutlineClose />}
        </button>
    )
}