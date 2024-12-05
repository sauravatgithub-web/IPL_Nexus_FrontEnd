import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import teamThemes from "../data/teamThemes";
import { useUpdateCartMutation } from "../redux/api/api";
import { useAsyncMutation } from "../hooks/hooks";

const Cart = () => {
    const { user } = useSelector((state) => state.auth);
    const [theme, setTheme] = useState({});
    const [updateCart] = useAsyncMutation(useUpdateCartMutation);

    useEffect(() => {
        if (user?.iplTeam) {
            setTheme(teamThemes[user.iplTeam] || {});
        }
    }, [user]);

    const handleRemove = async (productId) => {
        const updatedCart = user.cart.filter((item) => item.product.id !== productId);
        await updateCart("Updating cart...", { userId: user._id, cart: updatedCart });
        // Optionally trigger a Redux state update
    };

    const handleBuy = (product) => {
        alert(`Purchase Confirmed: ${product.name} for $${product.price}`);
        // Additional logic for purchase handling
    };

    return (
        <div
            className={`min-h-screen ${classes.commonStyle}`}
            style={{ background: theme.background }}
        >
            <h1 className={classes.cartHeader} style={{ color: theme.textColor }}>
                Your Cart
            </h1>
            <div className={classes.cartContainer}>
                {user.cart.length > 0 ? (
                    <ul className={classes.cartList}>
                        {user.cart.map((item) => (
                            <li
                                key={item.product.id}
                                className={classes.cartItem}
                                style={{
                                    backgroundColor: theme.cardBackground,
                                    color: theme.textColor,
                                }}
                            >
                                <div className={classes.productDetails}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className={classes.productImage}
                                    />
                                    <div>
                                        <h4>{item.product.name}</h4>
                                        <p>Price: ${item.product.price}</p>
                                        <p>Quantity: {item.count}</p>
                                    </div>
                                </div>
                                <div className={classes.actions}>
                                    <button
                                        className={classes.removeButton}
                                        onClick={() => handleRemove(item.product.id)}
                                        style={{ backgroundColor: theme.buttonBg }}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        className={classes.buyButton}
                                        onClick={() => handleBuy(item.product)}
                                        style={{ backgroundColor: theme.buttonBg }}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={classes.emptyMessage} style={{ color: theme.textColor }}>
                        Your cart is empty.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Cart;
