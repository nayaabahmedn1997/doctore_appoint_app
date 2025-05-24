// AnyComponent.jsx
import { Spin } from 'antd';

export const Spinner = ({ isLoading, children }) => {
  return (
    <Spin spinning={isLoading} tip="Loading..." size="large">
      {children}
    </Spin>
  );
};
