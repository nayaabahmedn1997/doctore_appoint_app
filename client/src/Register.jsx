import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const Register = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    return (
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
       


    )
}

export default Register