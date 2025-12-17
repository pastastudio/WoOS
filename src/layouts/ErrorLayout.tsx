import { ReactNode } from 'react';
import styles from './ErrorLayout.module.css';

const ErrorLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <div className={styles.errorLayout}>{children}</div>
    </>
  );
};

export default ErrorLayout;
