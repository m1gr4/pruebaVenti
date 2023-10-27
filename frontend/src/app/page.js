'use client';
import Link from 'next/link';
import { useState } from 'react';
const Page = () => {
  const backendUrl = process.env.BACKEND_URL || "localhost";

  const [userData, setUserData] = useState([]);
  const [showError, setShowError] = useState("hidden");
  const [saveOk, setSaveOk] = useState("hidden");

  const [state, setState] = useState({
    email: "",
    username: ""
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const fetchUserData = async () => {
    const headers = { "Content-Type": "application/json" }
    const response = await fetch(`http://${backendUrl}:3000/api/user/insecureGetAll`, {
      method: "GET",
      headers
    });
    const result = await response.json();
    setUserData(result);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError('hidden');
    const raw = JSON.stringify({
      "name": state.username,
      "email": state.email,
      "age": state.age,
    });

    const headers = { "Content-Type": "application/json" }
    const response = await fetch(`http://${backendUrl}:3000/api/user/post`, {
      method: "POST",
      headers,
      body: raw
    });
    const result = await response.json();
    if (result.error) {
      setShowError('block');
    } else {
      setSaveOk('block');
      setTimeout(() => {
        setSaveOk('hidden');
      }, 3000);
      document.getElementById("form").reset();
      fetchUserData();
    }
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-5`}>
      <form onSubmit={handleSubmit} id='form'>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Primera parte prueba técnica
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Crea un formulario simple para ingresar detalles de usuario.
            </p>
            <p className="mt-1 text-sm leading-6 text-red-600">
              Endpoint inseguro
            </p>
            <br />

            <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion del Usuario</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    required="required"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    required="required"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                  Edad
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="number"
                    name="age"
                    id="age"
                    required="required"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <p className={`bg-red-500 text-white p-4 w-full ${showError}`}>
            Email ya registrado, intenta nuevamente
          </p>
          <p className={`bg-green-500 text-white p-4 w-full ${saveOk}`}>
            Usuario registrado con exito.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Guardar
          </button>

          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/login">
            Login
          </Link>

          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/register">
            Register
          </Link>
        </div>
      </form>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Muestra la lista de todos los usuarios en la misma página, debajo del formulario
      </p>
      <div className="container flex mx-auto w-full items-center justify-center p-10">
        <ul className={`flex flex-col p-4`} >
          {
            userData.map(user => {
              return (
                <div key={user._id}>
                  <li className="border-gray-400 flex flex-row mb-2">
                    <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>
                      <div className="flex-1 pl-1 mr-16">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-gray-600 text-sm">{user.email}</div>
                      </div>
                      <div className="text-gray-600 text-xs">{user.creationDate}</div>
                    </div>
                  </li>
                </div>
              );
            })
          }
        </ul>
      </div>

    </main>
  )
}
export default Page;
