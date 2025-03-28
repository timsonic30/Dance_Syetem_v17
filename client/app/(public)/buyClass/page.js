"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./BuyClass.css";

export default function BuyClass() {
  // State management
  const [payProductArray, setPayProductArray] = useState([]);
  const [monthlyPass, setMonthlyPass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalculate, setShowCalculate] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeBoxId, setActiveBoxId] = useState(null);
  const [activeSpecialPro, setActiveSpecialPro] = useState(false);

  // Fetch product data on component mount
  useEffect(() => {
    const fetchPayProductData = async () => {
      try {
        const response = await fetch("http://localhost:3030/payProduct");
        const data = await response.json();

        if (!data.payProductData || !Array.isArray(data.payProductData)) {
          console.error("Invalid data format:", data.payProductData);
          return;
        }

        // Filter and sort class products by the number of classes
        const classProductItems = data.payProductData
          .filter((product) => product.productName.includes("Class"))
          .sort((a, b) => {
            const classesA = a.productName.match(/(\d+)/)
              ? parseInt(a.productName.match(/(\d+)/)[1], 10)
              : 0;
            const classesB = b.productName.match(/(\d+)/)
              ? parseInt(b.productName.match(/(\d+)/)[1], 10)
              : 0;
            return classesA - classesB; // Sort ascending by number of classes
          })
          .map((product) => ({
            id: product._id,
            name: product.productName,
            description: product.description,
            price: product.price,
            points: product.point,
            validDate: product.ValidDate,
            img: product.img || "./images/default-image.jpeg",
          }));

        setPayProductArray(classProductItems);

        // Extract the monthly pass product
        const monthlyPassProduct = data.payProductData.find(
          (product) => product.productName === "Monthly pass"
        );
        setMonthlyPass(monthlyPassProduct);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayProductData();
  }, []);

  // Handle selection of products or the monthly pass
  const handleClick = (id, isSpecialPro = false) => {
    if (isSpecialPro) {
      setActiveSpecialPro((prev) => !prev);
      setActiveBoxId(null);
    } else {
      setActiveBoxId(id);
      setActiveSpecialPro(false);
    }
    setShowCalculate(true);
    setClickCount((prevCount) => prevCount + 1);
  };

  // Placeholder functions for buttons
  const handleAddToCart = () => {
    console.log("Add to Cart clicked!");
  };

  const handleBookClass = () => {
    console.log("Book the Class clicked!");
  };

  // Find active product by its ID
  const activeProduct = payProductArray.find(
    (product) => product.id === activeBoxId
  );

  // Display loading spinner if fetching data
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Helper for rendering calculation table rows
  const renderCalculationRows = (activeProduct) => {
    const classesMatch = activeProduct.name.match(/(\d+)/);
    const numberOfClasses = classesMatch ? parseInt(classesMatch[1], 10) : null;

    const discountMatch = activeProduct.description.match(/Discount：-(\d+)%/);
    const discountPercentage = discountMatch
      ? parseInt(discountMatch[1], 10)
      : 0;
    const discountAmount = Math.round(
      activeProduct.price * (discountPercentage / 100)
    );
    const finalPrice = Math.round(activeProduct.price - discountAmount);

    // Handle cases where no class number is available
    if (!numberOfClasses) {
      return (
        <>
          {discountPercentage > 0 && (
            <tr>
              <td>
                <h2>Discount:</h2>
              </td>
              <td>${discountAmount}</td>
              <td>({discountPercentage}% OFF)</td>
            </tr>
          )}
          <tr>
            <td>
              <h3>Total:</h3>
            </td>
            <td>
              <h3>${finalPrice}</h3>
            </td>
          </tr>
        </>
      );
    }

    // Render rows for products with class numbers
    const pricePerClass = Math.round(finalPrice / numberOfClasses);
    return (
      <>
        {discountPercentage > 0 && (
          <tr>
            <td>
              <h2>Discount:</h2>
            </td>
            <td>${discountAmount}</td>
            <td>({discountPercentage}% OFF)</td>
          </tr>
        )}
        <tr>
          <td>
            <h2>Price per Class:</h2>
          </td>
          <td>${pricePerClass}</td>
          <td>/Class</td>
        </tr>
        <tr>
          <td>
            <h3>Total:</h3>
          </td>
          <td>
            <h3>${finalPrice}</h3>
          </td>
        </tr>
      </>
    );
  };

  return (
    <section className="BuyClassShow" id="BuyClassShow">
      {/* Header Section */}
      <div className="box-container">
        <div className="boxMain">
          <div className="image">
            <a href="#BuyClass">
              <img src="./cards04.jpeg" alt="Buy Class Section" />
            </a>
          </div>
          <div className="content">
            <a href="#BuyClass">
              <h1>Buy Class</h1>
            </a>
          </div>
        </div>

        {/* Product List Section */}
        <div className="AllPriceTag">
          {payProductArray.map((product) => (
            <div
              key={product.id}
              className={`boxPrice ${
                activeBoxId === product.id ? "active" : ""
              }`}
              onClick={() => handleClick(product.id)}
            >
              <h1>{product.name}</h1>
              <h2>${product.price}</h2>
              <a href="#AddCart">
                <img
                  src="AddShoppingCart.svg"
                  className="CartIcon"
                  alt={`Add ${product.name} to cart`}
                />
              </a>
            </div>
          ))}
        </div>

        {/* Monthly Pass Section */}
        {monthlyPass && (
          <div
            className={`SpecialPro ${activeSpecialPro ? "active" : ""}`}
            onClick={() => handleClick(null, true)}
          >
            <div className="PriceTagEx">
              <h1>{monthlyPass.productName} (30 Days)</h1>
              <h2>${monthlyPass.price}</h2>
              <span>{monthlyPass.description}</span>
              <a href="#AddCart">
                <img
                  src={"AddShoppingCart_white.png" || monthlyPass.img}
                  className="CartIcon"
                  alt="Add to Cart"
                />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Calculation Section */}
      {showCalculate && (
        <section className="calculate">
          <hr />
          <table>
            <thead>
              <tr>
                <th colSpan="3">
                  <h1>Your Order</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {activeProduct ? (
                <>
                  {/* Active Product Details */}
                  <tr>
                    <td>
                      <h2>{activeProduct.name}:</h2>
                    </td>
                    <td>${activeProduct.price}</td>
                  </tr>
                  {renderCalculationRows(activeProduct)}
                  <tr>
                    <td colSpan="3">
                      <span>{activeProduct.description}</span>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {/* Monthly Pass Details */}
                  <tr>
                    <td>
                      <h2>{monthlyPass.productName} (30 Days):</h2>
                    </td>
                    <td>${monthlyPass.price}</td>
                  </tr>
                  <tr>
                    <td>
                      <h3>Total:</h3>
                    </td>
                    <td>
                      <h3>${monthlyPass.price}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <span>{monthlyPass.description}</span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <hr />
        </section>
      )}

      {/* Bottom Action Buttons */}
      <section className="BuyClassButton">
        <div className="bottom-buttons">
          <button className="AddToCart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <a
            href="https://wa.me/your-whatsapp-number"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <img
              src="./WhatsAppWhite.png"
              alt="WhatsApp Icon"
              style={{ width: "25px", height: "25px" }} // Adjust size as needed
            />
            WhatsApp Inquiries
          </a>
          <button className="BookTheClass-btn" onClick={handleBookClass}>
            <Link href="/tutor" aria-label="Tutor Page">
              Book the Class
            </Link>
          </button>
        </div>
      </section>
    </section>
  );
}
