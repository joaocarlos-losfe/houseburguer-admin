import "./styles.css";

export const Input = ({placeholder, type, inputDataValue, setInputData}) =>
{
    return (
        <input 
            className="Input" 
            value={inputDataValue} 
            onChange={(e)=> setInputData(e.target.value)} 
            placeholder={placeholder} 
            type={type}
        />
    )
}