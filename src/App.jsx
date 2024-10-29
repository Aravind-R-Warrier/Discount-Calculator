import { TextField, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountsHistory, setDiscountsHistory] = useState([]);
  const [isOriginalPriceInputValue, setOriginalPriceInputValue] = useState(false);
  const [isDiscountRateInputValue, setDiscountRateInputValue] = useState(false);
  const [isTaxRateInputValue, setTaxRateInputValue] = useState(false);

  const handleValidation = (tag) => {
    const { name, value } = tag;
    if (!!value.match(/^[0-9]*\.?[0-9]*$/)) {
      if (name === 'originalPrice') {
        setOriginalPrice(value);
        setOriginalPriceInputValue(false);
      } else if (name === 'discountRate') {
        setDiscountRate(value);
        setDiscountRateInputValue(false);
      } else {
        setTaxRate(value);
        setTaxRateInputValue(false);
      }
    } else {
      if (name === 'originalPrice') {
        setOriginalPrice(value);
        setOriginalPriceInputValue(true);
      } else if (name === 'discountRate') {
        setDiscountRate(value);
        setDiscountRateInputValue(true);
      } else {
        setTaxRate(value);
        setTaxRateInputValue(true);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    let priceAfterDiscount = originalPrice;
    if (discountRate) {
      const discountAmount = (originalPrice * discountRate) / 100;
      priceAfterDiscount -= discountAmount;
    }
    
    if (taxRate) {
      const taxAmount = (priceAfterDiscount * taxRate) / 100;
      priceAfterDiscount += taxAmount;
    }

    setFinalPrice(priceAfterDiscount);
    setDiscountsHistory([...discountsHistory, { originalPrice, discountRate, taxRate, finalPrice: priceAfterDiscount }]);
  };

  const handleReset = () => {
    setOriginalPrice("");
    setDiscountRate("");
    setTaxRate("");
    setFinalPrice(0);
    setOriginalPriceInputValue(false);
    setDiscountRateInputValue(false);
    setTaxRateInputValue(false);
    setDiscountsHistory([]);
  };

  return (
    <div className="app-container">
      <Card className="calculator-card">
        <CardContent>
          <Typography variant="h4" className="title">Discount Calculator</Typography>
          <Typography variant="body1" className="subtitle">Calculate Your Discounts and Taxes</Typography>
          <div className="final-price-display">
            <Typography variant="h2" className="final-price">&#8377; {finalPrice.toFixed(2)}</Typography>
          </div>
          <form className="input-form">
            <TextField 
              id="originalPrice" 
              value={originalPrice} 
              name='originalPrice' 
              label="Original Price" 
              variant="outlined" 
              onChange={e => handleValidation(e.target)} 
              error={isOriginalPriceInputValue}
              helperText={isOriginalPriceInputValue ? "*Invalid Input" : ""}
            />
            <TextField 
              id="discountRate" 
              value={discountRate} 
              name='discountRate' 
              label="Discount Rate (%)" 
              variant="outlined" 
              onChange={e => handleValidation(e.target)} 
              error={isDiscountRateInputValue}
              helperText={isDiscountRateInputValue ? "*Invalid Input" : ""}
            />
            <TextField 
              id="taxRate" 
              value={taxRate} 
              name='taxRate' 
              label="Tax Rate (%)" 
              variant="outlined" 
              onChange={e => handleValidation(e.target)} 
              error={isTaxRateInputValue}
              helperText={isTaxRateInputValue ? "*Invalid Input" : ""}
            />
          </form>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleClick}>Calculate</Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
          </div>
        </CardContent>
      </Card>
      <div className="history border border-light ms-5 bg-light text-center" style={{minHeightheight:"100px",minWidthwidth:"400px"}}>
            <Typography variant="h5" style={{textDecoration:"underline brown"}}>Calculation History</Typography>
            {discountsHistory.map((item, index) => (
              <Chip className='d-flex justify-content-coloumn mt-3' key={index} label={`Original: ₹${item.originalPrice}, Discount: ${item.discountRate}%, Tax: ${item.taxRate}%, Final: ₹${item.finalPrice}`} />
            ))}
          </div>
    </div>
    
  );
}

export default App;
