import { ReactNode } from 'react';
import styles from './LoadingLayout.module.css';

const LoadingLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div className={styles.loadingLayout}>{children}</div>;
};

export default LoadingLayout;
