import React, { useState } from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';

const Create = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [email, setEmail] = useState('');
  const [supportRepID, setSupportRepID] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: `http://localhost:3000/customers`,
      data: {
        first_name: firstName,
        last_name: lastName,
        company: company,
        address: address,
        city: city,
        state: state,
        country: country,
        postal_code: postalCode,
        phone: phone,
        fax: fax,
        email: email,
        support_rep_id: supportRepID
      }
    })
    .then( result => {
      console.log(result.data);
      setFirstName('');
      setLastName('');
      setCompany('');
      setAddress('');
      setCity('');
      setState('');
      setCountry('');
      setPostalCode('');
      setPhone('');
      setFax('');
      setEmail('');
      setSupportRepID('');
    })
    .catch( err => {
      console.log(err.response);
    })
  }

  return (
    <>
      <h1>Create Customer</h1>
      <div className='container-a form-a'>
        <form className='form-style container-form' onSubmit={(e) => handleOnSubmit(e)}>
        <div className='container-c'>
          <label>
            First Name:
            <input type='text' required
            value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </label>
          <label>
            Last Name:
            <input type='text' required
            value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </label>
          <label>
            Company:
            <input type='text'
            value={company} onChange={(e) => setCompany(e.target.value)}/>
          </label>
          <label>
            Address:
            <input type='text'
            value={address} onChange={(e) => setAddress(e.target.value)}/>
          </label>
          <label>
            City:
            <input type='text'
            value={city} onChange={(e) => setCity(e.target.value)}/>
          </label>
          <label>
            State:
            <input type='text'
            value={state} onChange={(e) => setState(e.target.value)}/>
          </label>
          </div>
          <div className='container-c'>
          <label>
            Country:
            <input type='text'
            value={country} onChange={(e) => setCountry(e.target.value)}/>
          </label>
          <label>
            Postal Code:
            <input type='text'
            value={postalCode} onChange={(e) => setPostalCode(e.target.value)}/>
          </label>
          <label>
            Phone:
            <input type='text'
            value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </label>
          <label>
            Fax:
            <input type='text'
            value={fax} onChange={(e) => setFax(e.target.value)}/>
          </label>
          <label>
            Email:
            <input type='email' required
            value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            Support Rep ID:
            <input type='text'
            value={supportRepID} onChange={(e) => setSupportRepID(e.target.value)}/>
          </label>
          </div>
          <input className='submit-btn cursor' type='submit' value='Add Customer'/>
        </form>
      </div>
    </>
  )
}

export default Create;