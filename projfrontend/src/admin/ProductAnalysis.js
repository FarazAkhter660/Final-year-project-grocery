import React, { useState, useEffect } from "react";
import { XYPlot, LineSeries,VerticalBarSeries, XAxis, YAxis, Hint } from "react-vis";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ProductAnalysis = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);
  const [hoverData, setHoverData] = useState(null);

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // Define a seasonal pattern (example: quarterly seasonality)
  const seasonalPattern = [1, 1.8, 1.4, 1.2]; // Adjust the values based on your seasonal pattern

  // Generate the predicted stock values based on the seasonal pattern
  const predictedStock = products.map((product, index) => {
    const seasonalIndex = index % seasonalPattern.length;
    return product.stock * seasonalPattern[seasonalIndex];
  });

  // Prepare data for the line graph
  const actualGraphData = products.map((product, index) => ({
    x: product.name,
    y: product.stock,
  }));

  const predictedGraphData = products.map((product, index) => ({
    x: product.name,
    y: predictedStock[index],
  }));

  const handleHover = (datapoint) => {
    setHoverData(datapoint);
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <Base
      title="Product Analysis"
      description="Here you get the stock forcasting"
      className="container"
    >
    <h4 className="text-white"><span className="text-danger">&#x25A0;</span> - Actual Stock</h4>
    <h4 className="text-white"><span className="text-success">&#x25A0;</span> - Predicted Stock</h4>

    <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
        <XYPlot 
            height={300} 
            width={500} 
            xType="ordinal" 
            yType="linear"
            style={{ background: "black" }}
            >
            <XAxis 
            style={{ ticks: { stroke: "white" }, text: { fill: "white" } }}
            />
            <YAxis 
            style={{ ticks: { stroke: "white" }, text: { fill: "white" } }}
            />
            <LineSeries
            data={actualGraphData}
            color="red"
            onNearestX={handleHover}
            onSeriesMouseOut={handleMouseLeave}
            />
            <LineSeries
            data={predictedGraphData}
            color="green"
            onNearestX={handleHover}
            onSeriesMouseOut={handleMouseLeave}
            />
        </XYPlot>
        </div>
        <div style={{ flex: 1 }}>
        <XYPlot 
            height={300} 
            width={500} 
            xType="ordinal" 
            yType="linear"
            style={{ background: "black" }}
            >
            <XAxis 
            style={{ ticks: { stroke: "white" }, text: { fill: "white" } }}
            />
            <YAxis 
            style={{ ticks: { stroke: "white" }, text: { fill: "white" } }}
            />
            <VerticalBarSeries
            data={actualGraphData}
            color="red"
            onNearestX={handleHover}
            onSeriesMouseOut={handleMouseLeave}
            />
            <VerticalBarSeries
            data={predictedGraphData}
            color="green"
            onNearestX={handleHover}
            onSeriesMouseOut={handleMouseLeave}
            />
        </XYPlot>
        </div>
    </div>
      
      
    </Base>
  );
};

export default ProductAnalysis;
