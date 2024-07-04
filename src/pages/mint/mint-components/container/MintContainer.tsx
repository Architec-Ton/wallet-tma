import { ReactNode } from 'react';

import classNames from 'classnames';
// import Loader from "../../../../components/layout/Loader.tsx";


type Props = {
    children: ReactNode;
    className?: string;
    isLoading: boolean;
    loadingTitle: string;
};

function MintContainer({ children, className, isLoading}: Props) {
    return (
        <div
            className={classNames('container-mint', className)}
            style={{ padding: 'var(--layout-padding)' }}>
            {!isLoading && children}
            {/*{isLoading && <Loader/>}*/}
        </div>
    );
}

MintContainer.defaultProps = {
    isLoading: false,
    loadingTitle: null,
};

export default MintContainer;
