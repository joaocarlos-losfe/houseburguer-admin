import "./styles.css";

export const Select = ({options = [], firstvalue, placeholder, setInputData}) =>
{
    function setItem(item)
    {
        setInputData(item);
    }

    return (
        <select 
            defaultValue={options[0]} 
            className="Select" 
            placeholder={placeholder} 
            
            onChange={(e)=> {setItem(e.target.value)}}
            >
        {
            options.map(item=>
            {
                return <option key={item} value={item}>{item}</option>
            })
        }
        </select>
    )
}