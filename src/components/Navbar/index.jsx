import "./styles.css";

import { DataNavigation } from "./DataNavigation";
import { FiUsers } from "react-icons/fi";
import { MdRestaurant } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { RiStarSLine } from "react-icons/ri";

import { useContext } from "react";
import { navigationContext } from "../../context/NavigationContext";

import imgLogo from "../../assets/monophy.gif";

export const NavBar = ()=>
{
    const {page, setPage} = useContext(navigationContext);

    function setIcon(iconName)
    {
        switch(iconName)
        {
            case "FiUsers": return <FiUsers/>
            case "MdRestaurant": return <MdRestaurant/>
            case "BsBagCheck": return <BsBagCheck/>
            case "RiStarSLine": return <RiStarSLine/>
        }
    }
 
    return (
        <nav className="Navbar">
            
            <div className="Logo">
                <img src={imgLogo} alt="house burguer logo"/>
                <h1>House Burguer</h1>
            </div>

            <ul>
            {
                DataNavigation.map((item) =>
                {
                    return <>
                    
                    <div key={item.iconName} onClick={()=>{setPage(item.name)}} className="NavItem"
                        style={ page == item.name?
                            {backgroundColor: "var(--primary)", color: "white", fontWeight: "bold"} 
                            : 
                            {backgroundColor: "white", color: "var(--secondary)"} 
                            }
                        >
                        {setIcon(item.iconName)}
                        <li key={item.name} >{item.name}</li>
                     </div>
                    
                    </>
                    
                })
            }
            </ul>
        </nav>
    )
}