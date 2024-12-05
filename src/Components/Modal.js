import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ isOpen, onClose, product, onConfirm }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={classes.modalOverlay}>
            <div className={classes.modalContent}>
                <h2>Confirm Purchase</h2>
                <div className={classes.productDetails}>
                    <img src={product.image} alt={product.name} />
                    <div>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                    </div>
                </div>
                <div className={classes.modalActions}>
                    <button onClick={onClose} className={classes.cancelButton}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={classes.confirmButton}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
