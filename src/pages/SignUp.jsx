import { ImageUpIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { api_url } from '../api.js';

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username || username.length < 3)
      newErrors.username = 'Name field is not valid';

    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Email field is not valid';

    if (!password || password.length < 6)
      newErrors.password = 'Password field is not valid';

    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!avatar)
      newErrors.avatar = 'Avatar field is not valid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Submit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);
      
      setLoading(true)
      await axios.post(
        `${api_url}users/register`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then((res)=> {
        console.log(res);
        
        if(res.data.message == "This User Email Already Exists") {
          return alert('This Email Already Exists');
        }
        window.localStorage.setItem('id'  ,res.data.user.id);
        window.localStorage.setItem('email'  ,res.data.user.email);

        navigate('/')
        
      }).catch((e)=> {
        console.log(e);
      }).finally(()=> {
        setLoading(false)
      })
  };

  return (
    <form onSubmit={Submit}>
      <div className='w-screen h-screen bg-green-400 flex items-center justify-center'>
        <div className='min-w-[300px] min-h-[300px] bg-white p-12 rounded-2xl'>
          <div className='w-full h-full flex items-center justify-center flex-col'>
            <h1 className='text-gray-900 text-3xl font-medium'>SignUp</h1>
            <span className='text-gray-500 text-sm mt-2'>
              Complete fields to create new account
            </span>
          </div>

          {/* Username */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <UserIcon size={20} className='text-gray-500' />
            <input
              type="text"
              placeholder='username'
              className='outline-none'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.username}</p>
          )}

          {/* Email */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <MailIcon size={20} className='text-gray-500' />
            <input
              type="email"
              placeholder='email id'
              className='outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>
          )}

          {/* Password */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <LockIcon size={20} className='text-gray-500' />
            <input
              type="password"
              placeholder='Password'
              className='outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <LockIcon size={20} className='text-gray-500' />
            <input
              type="password"
              placeholder='confirm password'
              className='outline-none'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 ml-4">
              {errors.confirmPassword}
            </p>
          )}

          {/* Avatar */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <ImageUpIcon size={20} className='text-gray-500' />
            <input
              type="file"
              className='outline-none cursor-pointer'
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          {errors.avatar && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.avatar}</p>
          )}

          <p className='text-gray-500 text-sm mt-2'>
            Already Have An Account:{' '}
            <Link className='text-green-400 underline' to={'/login'}>
              Find It Now
            </Link>
          </p>

          <button
          disabled={loading}
            type='submit'
            className='w-full mt-5 bg-green-400 py-[11px] px-[11px] rounded-full text-white cursor-pointer'
          >
            {loading ? "Creating ..." : "Create Account"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
