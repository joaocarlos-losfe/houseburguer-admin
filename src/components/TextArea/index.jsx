import "./styles.css";

export const TextArea = ({placeholder, inputDataValue, setInputData}) =>
{
    return (
        <textarea 
            className="TextArea" 
            value={inputDataValue}  
            placeholder={placeholder} 
            onChange={(e)=> setInputData(e.target.value)} 
        />
    )
}