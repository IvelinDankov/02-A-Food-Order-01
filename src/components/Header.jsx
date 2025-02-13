import { useContext } from "react";
import mealAppLogo from "../assets/logo.jpg";
import Button from "./UL/Button.jsx";
import CartContext from "../store/CartContext.jsx";




export default function Header() {
   const cartCtx = useContext(CartContext)

   const totalCartItems = cartCtx.items.reduce((total, curItem) => {
    return total + curItem.quantity
   },0)

  return (
    <header id="main-header">
      <div id="title">
        <img src={mealAppLogo} alt="meal reactapp logo" />
        <h1> MealReactapp </h1>
      </div>
      <Button textOnly> Cart ({totalCartItems}) </Button>
    </header>
  );
}
