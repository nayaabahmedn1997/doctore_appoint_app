import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from './utils/Spinner';
import { useLoginUserMutation } from './store/api';
import { showToast } from './utils/toatService';
import { stopLoading } from './store/loadingSlice';
const Login = () => {

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const onFinish = async (formData) => {
    try {
      const res = await loginUser(formData).unwrap();
      showToast({type:'success', message: res.message});
      localStorage.setItem('token', res.token);
      navigate('/');
      stopLoading();
    } catch (error) {
      stopLoading();
      showToast({
        type: 'error',
        message: error?.data?.message || 'Something went wrong!',
      });
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (

    <div className="auth authentication register-page">
      <div className=" auth-form p-3 card">
                
        <h1 className='card-title'>Welcome back</h1>
        <Form
                    
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
                  

          <Form.Item
            label="Email"
            name="email"

            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='Email' type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type='password' placeholder='Password' />
          </Form.Item>


                      
          <Button type="primary" htmlType="submit" className='submit-button mt-3 mb-2'>
                                Login
          </Button>
          <Link className='register-login-links' to="/register">
                            Click here to register
          </Link>
                        
        </Form>
      </div>

    </div>

  );
};

export default Login;