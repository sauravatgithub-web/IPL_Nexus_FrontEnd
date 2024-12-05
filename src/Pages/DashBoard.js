import React, { useEffect, useState } from "react";
import teamThemes from "../data/teamThemes";
import classes from "./DashBoard.module.css";
import { useSelector } from "react-redux";
import { useGetProductsQuery, useUpdateCartMutation } from "../redux/api/api";
import Modal from "../Components/Modal";
import { useAsyncMutation, useErrors } from '../hooks/hooks.jsx';
import maps from '../Assests/team'

const Dashboard = () => {
	const [theme, setTheme] = useState({});
	const [logo, setLogo] = useState();
	const { user } = useSelector((state) => state.auth);
	const [cart, setCart] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const { data, error, isLoading, isError } = useGetProductsQuery();
	const errors = [{ isError: isError, error: error }];
	useErrors(errors);

	const [updateCart, isLoadingUpdateCart] = useAsyncMutation(useUpdateCartMutation);

	useEffect(() => {
		if (user?.iplTeam) {
			setTheme(teamThemes[user.iplTeam] || {});
			setLogo(maps.logoMap.get(user.iplTeam));
		}
		if (user?.cart) {
			setCart(user.cart || []);
		}
	}, [user]);

	const addToCart = async (product) => {
		const updatedCart = cart.map(item =>
			item.product._id === product._id
				? { ...item, count: item.count + 1 }
				: item
		);
		
		const isProductNew = !cart.some(item => item.product._id === product._id);
		if (isProductNew) {
			updatedCart.push({ product, count: 1, name: product.name });
		}

		setCart(updatedCart);
		await updateCart("Adding to cart...", { userId: user._id, cart: updatedCart });
	};

	const handleBuyNow = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	const handleConfirmPurchase = () => {
		alert(`Purchase Confirmed: ${selectedProduct.name} for $${selectedProduct.price}`);
		handleCloseModal();
	};

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (isError) {
		return <div>Error fetching products: {error.message}</div>;
	}

	return (
		<div className={`min-h-screen ${classes.commonStyle}`} style={{ background: theme.background }}>
			<div className={`${classes.titleBar}`} style={{ background: theme.titleColor }}>
				<label className={classes.label}>Welcome to the {maps.teamMap.get(user.iplTeam)} Fan Store.</label>
				<img className = {classes.titleImage} src = {logo} alt = "team logo"></img>
			</div>
			<main className={classes.productGrid}>
				{data?.products?.map((product) => (
					<div
						key={product._id}
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
								disabled={isLoadingUpdateCart}
							>
								{isLoadingUpdateCart ? "Adding..." : "Add to Cart"}
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

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				product={selectedProduct}
				onConfirm={handleConfirmPurchase}
			/>
		</div>
	);
};

export default Dashboard;