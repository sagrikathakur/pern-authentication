import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const navigate = useNavigate()

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext)

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-100 to-purple-100'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:opacity-80 transition-opacity'
      />

      <div className='bg-slate-900 p-10 rounded-lg shadow-2xl w-full sm:w-96 text-indigo-300 text-sm border border-white/10 backdrop-blur-sm'>

        <h2 className='text-3xl font-semibold text-white text-center mb-3 tracking-tight'>
          {state === 'Sign Up' ? 'Create Account' : 'Login to your account'}
        </h2>
        <p className='text-center text-sm mb-6 font-light'>
          {state === 'Sign Up' ? 'Start your journey with us' : 'Welcome back, explorer!'}
        </p>

        <form onSubmit={onSubmitHandler} className='space-y-4'>
          {state === 'Sign Up' && (
            <div className='group relative flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400/50 transition-all shadow-inner'>
              <img src={assets.person_icon} alt="" className='opacity-70 group-focus-within:opacity-100 transition-opacity' />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none w-full text-white placeholder-indigo-400/60'
                type="text"
                placeholder='Full Name'
                required />
            </div>
          )}

          <div className='group relative flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400/50 transition-all shadow-inner'>
            <img src={assets.mail_icon} alt="" className='opacity-70 group-focus-within:opacity-100 transition-opacity' />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none w-full text-white placeholder-indigo-400/60'
              type="email"
              placeholder='Email ID'
              required />
          </div>

          <div className='group relative flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#333A5C] border border-transparent focus-within:border-indigo-400/50 transition-all shadow-inner'>
            <img src={assets.lock_icon} alt="" className='opacity-70 group-focus-within:opacity-100 transition-opacity' />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none w-full text-white placeholder-indigo-400/60'
              type="password"
              placeholder='Password'
              required />
          </div>

          <p
            onClick={() => navigate('/reset-password')}
            className='text-right text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors'
          >
            Forgot password?
          </p>

          <button className='w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all mt-2'>
            {state}
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-white/5'>
          {state === 'Sign Up' ? (
            <p className='text-gray-400 text-center text-xs'>
              Already have an account?{' '}
              <button
                onClick={() => setState('Login')}
                className='text-indigo-400 font-medium hover:underline focus:outline-none'
              >
                Login here
              </button>
            </p>
          ) : (
            <p className='text-gray-400 text-center text-xs'>
              New here?{' '}
              <button
                onClick={() => setState('Sign Up')}
                className='text-indigo-400 font-medium hover:underline focus:outline-none'
              >
                Create an account
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Login

