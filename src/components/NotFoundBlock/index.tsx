import React from 'react';
import styles from './NotFound.module.scss';

const NotFoundBlock:React.FC = () => {
    return (
        <div className={styles.main}>
            <h1 >
                <span>🙃</span>
                <br />
                nothing is here
            </h1>
            <div className={styles.description}>к сожалению тут ничего</div>
            </div>
    );
};

export default NotFoundBlock;