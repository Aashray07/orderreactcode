import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderPage = () => {
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('email');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Create the order data object
    const orderData = {
      itemName,
      quantity,
      userEmail,
      // Add other form field data as needed
    };

    try {
      // Send the order data to the backend Lambda function
      const response = await fetch(`${process.env.REACT_APP_ORDER_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Order submitted successfully
        console.log('Order Submitted:', orderData);

        // Clear the input fields after order submission
        setItemName('');
        setQuantity(1);

        // You can also show a success message to the user if needed
        alert('Order submitted successfully!');
      } else {
        // Handle errors if the order submission fails
        console.error('Error submitting the order.');
        alert('Error submitting the order. Please try again later.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error occurred during order submission:', error);
      alert('An error occurred during order submission. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmitOrder}>
        <div>
          <label>Item:</label>
          <input type="text" value={itemName} onChange={handleItemNameChange} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={handleQuantityChange} />
        </div>
        {/* Add more form fields here */}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderPage;
