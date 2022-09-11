import "./styles.css";

export const SubmitFile = ( {setFilePath} ) =>
{
    return (
        <input 
            className="SubmitFile" 
            accept="image/*" 
            type={'file'}  
            onChange={(e)=>{setFilePath(e.target.files[0])}}
        />
    )
}