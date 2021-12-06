import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import Create from './Create.jsx';
import { initialRange } from '../App.js';

export const retrieveContext = React.createContext();

const Retrieve = () => {

  let context = React.useContext(initialRange);
  const getRange = context.getRange;
  const rangeMin = context.rangeMin;
  const rangeMax = context.rangeMax;

  const [customer, setCustomer] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    method: '',
    id: '',
    idRangeMin: '',
    idRangeMax: ''
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if ( customerInfo.method === 'delete') {
      await axios({
        method: 'get',
        url: `http://localhost:3000/customers/${customerInfo.id}`
      })
      .catch( err => {
        alert(`Customer ID: ${customerInfo.id} does not exist!`);
        setCustomerInfo({...customerInfo, id: ''})
      })
    }
    await axios({
      method: customerInfo.method,
      url: `http://localhost:3000/customers/${customerInfo.id}`
    })
    .then( result => {
      setCustomer(result.data);
      getRange();
    })
    .catch(  err => {
      alert(`Customer ID: ${customerInfo.id} does not exist!`);
      setCustomerInfo({...customerInfo, id: ''})
    })
  }

  return (
    <>
      {/* <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form> */}
      <form id="ret-form" onSubmit={(e) => handleOnSubmit(e)}>
        <div class="mb-3">
        <label class="form-label">
          Enter Customer ID:
          <input type='text' required class="form-control"
          value={customerInfo.id} onChange={(e) => setCustomerInfo({...customerInfo, id: e.target.value})}/>
        </label>
        </div>
        <input type='submit' value='Get Customer' class="btn btn-primary"
        onClick={() => setCustomerInfo({...customerInfo, method: 'get'})}
        />
        <input type='submit' value='Delete Customer' class="btn btn-primary"
        onClick={() => setCustomerInfo({...customerInfo, method: 'delete'})}
        />
        <p>ID Range: {rangeMin} - {rangeMax}</p>
      </form>
      <div className='container-a'>
        <div className='container-b'>
          <p>First Name: <strong>{customer.first_name}</strong></p>
          <p>Last Name: <strong>{customer.last_name}</strong></p>
          <p>Company: <strong>{customer.company}</strong></p>
          <p>Address: <strong>{customer.address}</strong></p>
          <p>City: <strong>{customer.city}</strong></p>
          <p>State: <strong>{customer.state}</strong></p>
        </div>
        <div className='container-b'>
          <p>Country: <strong>{customer.country}</strong></p>
          <p>Postal Code: <strong>{customer.postal_code}</strong></p>
          <p>Phone: <strong>{customer.phone}</strong></p>
          <p>Fax: <strong>{customer.fax}</strong></p>
          <p>Email: <strong>{customer.email}</strong></p>
          <p>Support Rep ID: <strong>{customer.support_rep_id}</strong></p>
        </div>
      </div>
      <retrieveContext.Provider value={customer}>
        <Create />
      </retrieveContext.Provider>
    </>
  )
}

export default Retrieve;