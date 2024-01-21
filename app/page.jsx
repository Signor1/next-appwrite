'use client'
import { useEffect, useState } from "react";
import { account, ID } from "./appwrite"

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    async function getUser() {
      setUser(await account.get())
      setLoadingUser(false)
    }
    getUser()
  })

  //for handling login
  const handleLogin = async () => {
    try {
      await account.createEmailSession(email, password)
      setUser(await account.get())
      setEmail('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  //for handling registration
  const handleRegister = async () => {
    try {
      await account.create(ID.unique(), email, password)
      //login user after registration
      await handleLogin()
    } catch (e) {
      console.log(e)
    }
  }

  //for logging out users
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null)
    } catch (e) {
      console.log(e)
    }
  }


  //if it is loading
  if (loadingUser) {
    return (
      <section className="max-w-md mx-auto mt-8 bg-gray-800 rounded-lg overflow-hidden shadow-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="animate-spin h-8 w-8 text-white mr-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <h2 className="font-bold text-xl text-white">Loading user</h2>
        </div>
        <p className="text-gray-400">Please wait while we retrieve your information.</p>
      </section>
    )
  }

  //if there is a logged in user
  if (user) {
    return (
      <div className="max-w-md mx-auto mt-8 px-6 py-4 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="mb-4">
          <div className="font-bold text-2xl mb-2 text-white">Already Logged In</div>
          <p className="text-gray-400">You're already logged in. No need to log in again.</p>
        </div>
        <button type="button" onClick={handleLogout} className="bg-blue-500 flex-1 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300">Logout</button>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl mb-8 font-bold">Log In or Sign Up</h1>
      <form className="flex flex-col gap-4 h-auto rounded-md bg-gray-800 p-10 lg:w-[60%] md:w-[70%] w-full">
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="py-2 px-4 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 px-4 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="flex items-center gap-8 mt-6">
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 flex-1 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="bg-green-500 flex-1 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </div>

      </form>
    </main>

  );
}
