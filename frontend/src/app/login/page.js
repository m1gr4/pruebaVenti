'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
const Login = () => {
  const backendUrl = process.env.BACKEND_URL || "localhost";

  const [checkData, setCheckData] = useState("hidden");
  const [displayForm, setDisplayForm] = useState("block");
  const [displaySdata, setDisplaySdata] = useState("hidden");
  const [isLogin, setIsLogin] = useState();
  const [state, setState] = useState({
    email: "",
    username: ""
  });
  const [dataChecked, setDataChecked] = useState({
    name: "",
    email: "",
    age: "",
    creationDate: ""
  });

  const handleLogOut = (e) => {
    setIsLogin(false);
    setDisplayForm("block");
    setDisplaySdata("hidden");
    localStorage.clear();
  }

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      setDisplayForm("hidden");
      setIsLogin("true");
      setDisplaySdata("block");
    }
  }, [isLogin]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const raw = JSON.stringify({
      "name": state.username,
      "email": state.email
    });

    const headers = { "Content-Type": "application/json" }
    const response = await fetch(`http://${backendUrl}:3000/api/user/login`, {
      method: "POST",
      headers,
      body: raw
    });

    const result = await response.json();
    if (response.status == 200) {
      localStorage.setItem("auth_token", result.auth_token);
      localStorage.setItem("userId", result.id);
      setDisplayForm("hidden");
      setDisplaySdata("block");
    } else {

    }
  }

  const fetchDataById = () => {
    const myHeaders = new Headers();
    myHeaders.append("auth_token", localStorage.getItem("auth_token"));
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://${backendUrl}:3000/api/user/getOne/${localStorage.getItem("userId")}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDataChecked({
          name: result.name,
          email: result.email,
          age: result.age,
          creationDate: result.creationDate
        });
        setCheckData("block");
      })
      .catch(error => console.log('error', error));
  }

  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>

      <h1 className="text-base font-semibold leading-7 text-gray-900 mb-4">
        Segunda parte prueba técnica.
      </h1>
      <div className={`w-full max-w-xs ${displaySdata}`}>
        <form className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
          <div className="mb-4">

            <p className="mt-1 text-sm text-center leading-6 text-green-600">
              Ya te encuentras logeado.
            </p>

            <button
              className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={fetchDataById}
            >
              Revisa tus datos
            </button>

            <button
              className="bg-red-300 mt-3 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleLogOut}
            >
              Log Out
            </button>

            <div className={`${checkData}`}>
              <div className="grid grid-rows-4 grid-flow-col gap-0 mt-5 text-sm">
                <div>Nombre: {dataChecked.name}</div>
                <div>Email: {dataChecked.email}</div>
                <div>Edad: {dataChecked.age}</div>
                <div>Fecha creación: {dataChecked.creationDate}</div>
              </div>
            </div>

          </div>
        </form>
      </div>

      <div className={`w-full max-w-xs ${displayForm}`}>
        <form onSubmit={handleSubmit} className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Nombre</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="username"
              type="text"
              placeholder="Nombre"
              onChange={handleChange}
              value={state.username}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={state.email}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/register">
              Registro
            </Link>
          </div>
        </form>

      </div>
    </main >
  )
}
export default Login;