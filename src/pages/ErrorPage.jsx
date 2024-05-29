import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Not found this page."
      extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
    />
  );
};

export default ErrorPage;