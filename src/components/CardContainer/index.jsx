import "./styles.css";

export const CardContainer = ( {children, title}) =>
{
    return(
        <div className="CardContainer">
            {title && <h1>{title}</h1>}
            {children}
        </div>
    )
}