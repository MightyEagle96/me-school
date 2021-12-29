import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpService } from '../../../data/services';

export default function AddStoreItem({ RefreshPage }) {
  const [product, setProduct] = useState({});

  function CreateItem(e) {
    e.preventDefault();

    Swal.fire({
      icon: 'question',
      text: 'Do you wish to create this product?',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = 'store/createItem';
        const res = await httpService.post(path, product);

        if (res) {
          Swal.fire({ icon: 'success', text: res.data.message });
          if (RefreshPage) {
            RefreshPage();
          }
        }
      }
    });
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="">
        <div className="alert alert-danger p-3">
          <div className="h5 text-center">Add a new product to the store</div>
        </div>
        <div className="mt-3">
          <div className="p-4  shadow-lg rounded">
            <form onSubmit={CreateItem}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={product.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={product.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  value={product.quantity}
                />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-success" type="submit">
                  Create
                </button>
                <button className="btn btn-danger ml-2" type="reset">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
