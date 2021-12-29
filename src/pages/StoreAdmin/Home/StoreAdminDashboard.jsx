import React, { useState, useEffect } from 'react';
import './StoreAdminDashboard.scss';
import { httpService, loggedInUser } from '../../../data/services';
import AddStoreItem from '../Store/AddStoreItem';

export default function StoreAdminDashboard() {
  const [products, setProducts] = useState([]);

  async function GetProducts() {
    const path = 'store/viewProducts';

    const res = await httpService.get(path);

    if (res) {
      setProducts(res.data.products);
    }
  }

  useEffect(() => {
    GetProducts();
  }, []);
  return (
    <div className="mr-2">
      <div className="jumbotron storeAdminDashboard p-5 text-white">
        <div className="display-4">Welcome, {loggedInUser.lastName}</div>
        <hr className="my-4 border-white" />
      </div>
      <div className="mt-2">
        <div className="row">
          <div className="col-md-6">
            <div>
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </thead>
                <tbody>
                  {products.map((p, index) => (
                    <tr key={index}>
                      <td>{p.name}</td>
                      <td>{`N${p.price}.00`}</td>
                      <td>{p.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabindex="-1">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    2 <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-6">
            <AddStoreItem RefreshPage={GetProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
