import "./styles.css";

export const Button = ({text, bgColor, textColor, pressAction}) =>
{
    return (
        <button className="Button" onClick={pressAction} type="button" style={{backgroundColor: bgColor, color: textColor}} >
            {text}
        </button>
    )
}