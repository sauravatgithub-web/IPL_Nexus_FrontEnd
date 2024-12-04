import React, { useEffect, useState } from "react";
import teamThemes from "../data/teamThemes";
import classes from "./DashBoard.module.css";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";
import toast from "react-hot-toast";

const Dashboard = () => {
	const [theme, setTheme] = useState({});
	const { user } = useSelector((state) => state.auth);
	const [cart, setCart] = useState([]); 

	const { data, error, isLoading, isError } = useGetProductsQuery();
	const errors = [{ isError: isError, error: error }];
	useErrors(errors);

	useEffect(() => {
		if (user?.iplTeam) {
			setTheme(teamThemes[user.iplTeam] || {});
		}
	}, [user]);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find((item) => item.id === product.id);
			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
			
		});
	};

	const handleBuyNow = (product) => {
		if (product.quantity !== 0) {
			window.location.href = product.productUrl;
		} 
		else {
			toast.error("This product is not available for purchase at the moment.");
		}
	};

	const viewCart = () => {
		alert("Cart contents:\n" + cart.map(item => `${item.name} x${item.quantity}`).join("\n"));
	};

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (isError) {
		return <div>Error fetching products: {error.message}</div>; 
	}

	return (
		<div className={`min-h-screen ${classes.commonStyle}`} style={{ background: theme.background }}>
			<button
				className={`${classes.productButton} ${classes.viewCartButton}`}
				onClick={viewCart}
			>
				View Cart
			</button>
			<main className={classes.productGrid}>
				{data?.products?.map((product) => (
					<div
						key={product.id}
						className={`${classes.productCard}`}
						style={{
							backgroundColor: theme.cardBackground,
							color: theme.textColor,
						}}
					>
						<img
							src={product.image}
							alt={product.name}
							className={classes.productImage}
						/>
						<h2 className={classes.productTitle}>{product.name}</h2>
						<p className={classes.productPrice}>${product.price}</p>
						<div className={classes.buttonContainer}>
							<button
								className={`${classes.productButton}`}
								style={{ backgroundColor: theme.buttonBg }}
								onClick={() => addToCart(product)} 
							>
								Add to Cart
							</button>
							<button
								className={`${classes.productButton}`}
								style={{ backgroundColor: theme.buttonBg }}
								onClick={() => handleBuyNow(product)}
							>
								Buy Now
							</button>
						</div>
					</div>
				))}
			</main>
		</div>
	);
};

export default Dashboard;
