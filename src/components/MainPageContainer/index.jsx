import { useContext } from "react";

import "./styles.css";

import { navigationContext } from "../../context/NavigationContext";
import { ClientPage } from "../../Pages/Client";
import { MenuItemsPage } from "../../Pages/MenuItems";
import { PromotionsPage } from "../../Pages/Promotions";
import { DrawPage } from "../../Pages/Draw";

export const MainPageContainer = ()=>
{

    const {page, setPage} = useContext(navigationContext);

    return (
        <div className="MainPageContainer">
        { page == "Cliente" && <ClientPage/> }
        { page == "Cardápio" && <MenuItemsPage/> }
        { page == "Promoções" && <PromotionsPage/> }
        { page == "Sorteio" && <DrawPage/> }
        </div>
    )
}