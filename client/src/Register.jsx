import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from './store/api';
import { showToast } from './utils/toatService';
import { Spinner } from './utils/Spinner';
import { useSelector } from 'react-redux';
import { stopLoading } from './store/loadingSlice';
const Register = () => {

  const isSpinnerLoading = useSelector((state)=>state.loader.isLoading);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onFinish =async ( formData) => {
    try {
      const res = await registerUser(formData).unwrap();
      showToast({type:'success', message: res.message});
      stopLoading();
      navigate('/login');
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
    <Spinner isLoading={isSpinnerLoading}>
      <div className="auth authentication register-page">
        <div className=" auth-form p-3 card">
                
          <h1 className='card-title'>Nice to meet u</h1>
          <Form
                    
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='Name' />
            </Form.Item>

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
                                Register
            </Button>
            <Link className='register-login-links' to="/login">
                            Click here to login
            </Link>
                        
          </Form>
        </div>

      </div>
    </Spinner>

  );
};

export default Register;