import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../../actions/guest";
import AlertMessage from "../alert/AlertMessage";
import ButtonLoader from "../loader/ButtonLoader";
import axios from "axios";
// components

export default function AddByUser() {

  const dispatch = useDispatch();
  const { guest }= useSelector(state => state.addGuestReducer);



  // const { data, message, success } = guest;
  const [state, setState] = React.useState({
    name: "",
    phone : "",
    email : "",
    address: "",
    gender : null,
    purpose : ""
  });

  const [showAlert, setShowAlert] = React.useState(false);


  const handleInput = (e) =>{
  
      const { name, value } = e.target;
      
      setState({
        ...state, 
        [name] : value
      })
  };
  
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) =>{
      e.preventDefault();
      setloading(true)
                        axios
                        .post('/api/addguest', state )
                        .then(res => {
                          
                        
                          dispatch(addGuest(res.data));
                          setShowAlert(true);
                         
                          setState({
                            name: "",
                            phone : "",
                            address: "",
                            email : "",
                            gender : null,
                            purpose : ""
                          })
                          setloading(false)
                        })
                        .catch((err)=>{
                          const msg = JSON.parse(err.request.response);
                          dispatch(addGuest(msg));
                          setloading(false)
                          setShowAlert(true);
                        })
        
    };
    

  return (
    <>
      {guest && <AlertMessage message={guest.message} show={showAlert} setShowAlert={setShowAlert} success={guest.success}/>}
      <div className="font-sans relative border border-gray-200 flex flex-col break-words w-full mb-6 shadow-lg rounded-lg ">
        <div className="rounded-t bg-blue-900 mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-white text-sm md:text-2xl font-light">Masukan Data Anda</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <h6 className="text-gray-800 text-xs md:text-base mt-3 mb-6 font-semibold">
              Informasi Tamu
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    required
                    value={state.name}
                    className="border border-gray-300 px-3 py-3  text-gray-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Masukkan nama"
                    name="name"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Jenis Kelamin
                  </label>
                <div className="relative w-3/6 mb-3 flex  flex-wrap justify-between">
                    <div className="">
                       <input checked={state.gender == "Laki-Laki" ? true : false } onChange={(e) => handleInput(e)} type="radio" id="Laki-Laki" name="gender" value="Laki-Laki"/>
                        <label  className="font-light ml-2 text-xs md:text-sm" htmlFor="Laki-Laki">Laki - Laki</label>  
                    </div>
                    <div className="">
                      <input checked={state.gender == "Perempuan" ? true : false } onChange={(e) => handleInput(e)}  type="radio" id="Perempuan" name="gender" value="Perempuan"/>
                      <label className="font-light ml-2 text-xs md:text-sm" htmlFor="Perempuan">Perempuan</label>
                    </div>
                </div>
    
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-gray-300" />

            <h6 className="text-gray-800 text-xs md:text-base mt-3 mb-6 font-semibold">
              Kontak dan Alamat
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={state.address}
                    onChange={(e) => handleInput(e)}
                    name="address"
                    className="border border-gray-300 px-3 py-3  text-gray-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Masukkan alamat"
                  />
                  <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2 mt-5"
                    htmlFor="grid-password"
                  >
                   E-mail
                  </label>
                  <input
                    type="email"
                    // required
                    onChange={(e) => handleInput(e)}
                    name="email"
                    value={state.email}
                    className="border border-gray-300 px-3 py-3  text-gray-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Masukkan email"
                  />
                   <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2 mt-5"
                    htmlFor="grid-password"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={state.phone}
                    placeholder="Masukkan nomor telepon"
                    onChange={(e) => handleInput(e)}
                    className="border border-gray-300 px-3 py-3   text-gray-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-gray-300" />

            <h6 className="text-gray-800 text-xs md:text-base mt-3 mb-6 font-semibold">
              Lainnya
            </h6>
            <div className="flex  mt-5 flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-gray-500 text-xs md:text-sm font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Tujuan Kunjungan
                  </label>
                  <textarea
                    type="text"
                    name="purpose"
                    value={state.purpose}
                    onChange={(e) => handleInput(e)}
                    className="border border-gray-300 px-3 py-3  text-gray-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    placeholder="Tujuan berkunjung"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 w-20 text-white active:bg-gray-500 font-semibold text-xs md:text-base px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150">
                      {loading ? <ButtonLoader /> : 'Kirim'}
                </button>
            </div>
        
          </form>
        </div>
      </div>
    </>
  );
}