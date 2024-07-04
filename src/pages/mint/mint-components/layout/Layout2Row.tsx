import { ReactNode } from 'react';
import './Layout-mint.styles.css';
import Layout2 from './Layout2';

type Props = {
    children: ReactNode;
};

function Layout2Row({ children }: Props) {
    return (
        <Layout2
            style={{
                maxWidth: '475px',
                justifyContent: 'start',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {children}
        </Layout2>
    );
}

export default Layout2Row;