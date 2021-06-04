import { useState, useEffect, useMemo } from "react";
import "./App.css";
import card from "./card.png";

const App = () => {
  const initialValues = { vendor: "", media: "", corp: "", team: "" };
  const businessCards = [
    { card: "Brex", value: "0.3" },
    { card: "Stripe", value: "2.9" },
    { card: "Amex", value: "1.3" },
  ];
  const [brand, setBrand] = useState("");
  const [brandSum, setBrandSum] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);

  // Saving at Local Storage
  useEffect(() => {
    getLocal();
  }, []);

  useEffect(() => {
    saveLocal();
  }, [brand, brandSum, formValues]);

  // Handling Input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Doing the math
  const sum = useMemo(() => {
    return Object.values(formValues).reduce(
      (acc, v) => acc + (parseInt(v) || 0),
      0
    );
  }, [formValues]);

  // Clear Button
  const clear = () => {
    setBrand("");
    setBrandSum(0);
    setFormValues(initialValues);
  };

  // Saving at Local Storage
  const saveLocal = () => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
    localStorage.setItem("brand", JSON.stringify(brand));
    localStorage.setItem("brandSum", JSON.stringify(brandSum));
  };

  const getLocal = () => {
    const formData = localStorage.getItem("formValues");
    formData
      ? setFormValues(JSON.parse(formData))
      : setFormValues(initialValues);
    const brandData = localStorage.getItem("brand");
    brandData ? setBrand(JSON.parse(brandData)) : setBrand("");
    const sumData = localStorage.getItem("brandSum");
    sumData ? setBrandSum(JSON.parse(sumData)) : setBrandSum(0);
  };

  // Button setting
  const setCardDetails = (multiply, title) => {
    setBrand(title);
    setBrandSum(sum * multiply);
  };

  return (
    <div className="App">
      <header className="App-header">Calculate your Rewards</header>
      <form className="form">
        <div>
          <label htmlFor="vendor">Vendor/Bills</label>
          <input
            name="vendor"
            onChange={(e) => handleChange(e)}
            value={formValues.vendor}
            placeholder="Enter a number"
            type="number"
          ></input>
        </div>
        <div>
          <label htmlFor="media">Media/Ad Spend</label>
          <input
            name="media"
            onChange={(e) => handleChange(e)}
            value={formValues.media}
            placeholder="Enter a number"
            type="number"
          ></input>
        </div>
        <div>
          <label htmlFor="corp">Corp.Spend</label>
          <input
            name="corp"
            onChange={(e) => handleChange(e)}
            value={formValues.corp}
            placeholder="Enter a number"
            type="number"
          ></input>
        </div>
        <div>
          <label htmlFor="team">Team Project</label>
          <input
            name="team"
            onChange={(e) => handleChange(e)}
            value={formValues.team}
            placeholder="Enter a number"
            type="number"
          ></input>
        </div>
      </form>
      <button type="button" onClick={(e) => clear(e)}>
        Clear
      </button>
      <div className="compare">
        <h1>Compare Your Rewards</h1>
        <div className="options">
          {businessCards.map(({ value, card }) => (
            <button
              key={card}
              type="button"
              onClick={() => setCardDetails(value, card)}
              className={brand === card ? "activeTab" : undefined}
            >
              {card}
            </button>
          ))}
        </div>
        <div className="results">
          <div className="left">
            <img src={card} alt="card" />
          </div>
          <div className="right">
            <div>
              <span id="brand">
                {brand ? brand.toLocaleUpperCase() : "Choose"}
              </span>
              <h3>Business Card</h3>
              <span>{`$ ${brandSum.toFixed(3)}`}</span>
            </div>
            <div>
              <h3>Unlimited Rewards</h3>
              <span>{`$ ${(sum * 1.1).toFixed(3)}`}</span>
            </div>
            <div>
              <h2>Lifetime Rewards</h2>
              <span>{`$ ${(sum * 1.2).toFixed(3)}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
