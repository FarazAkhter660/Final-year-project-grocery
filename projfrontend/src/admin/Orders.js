import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const Vieworders = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);

  const preload = () => {
    getAllOrders().then((data) => {
        console.log(data)
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

//   const onClick = (productId) => () => {
//     deleteProduct(productId, user._id, token)
//       .then((data) => {
//         if (data.err) {
//           console.log(data.err);
//         } else {
//           preload();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  return (
    <Base
      title="Manage Products"
      description="Welcome to product management section"
      className="container"
    >
      <table className="table table-dark table-borderless table-hover">
        <tbody>
          {products.map((order, index) => {
            return (
              <tr key={index}>
                <th scope="row" className="text-white bg-dark rounded shadow">
                    Order id: cd{order._id}
                </th>
                <td className="text-center ">
                    {order.products.map((product,index)=>{
                        return(
                            <div className="text-white bg-dark rounded shadow">
                            {/* {product.name} */}
                            <div><b>Name :</b> {product.name}</div>
                            <div><b>Price :</b>{product.price}</div>
                            <div><b>Quantity :</b>{product.count}kg</div>
                            </div>
                            
                        )
                    })}
                </td>
                <td className="text-center text-white bg-dark rounded shadow">
                    Total Amount: {order.amount}
                </td>
                <td className="text-center text-white bg-dark rounded shadow">
                    Mode :{order.transaction_id}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
};

export default Vieworders;
