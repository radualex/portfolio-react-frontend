import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Constants
import { EXTERNAL } from './constants';
import { ContentSection } from '@/admin/constants';

// Components
import EditableText from '@/components/EditableText';
import SectionEditButton from '@/components/SectionEditButton';

// Store
import { CV_PATH, EMAIL_ADDRESS, GITHUB } from '@/store/defaults';

// Styles
import styles from './styles.module.css';

export interface Props extends React.ComponentProps<'footer'> {
    firstLink?: 'email' | 'home';
}

const PageFooter: React.FunctionComponent<Props> = ({ firstLink = 'email', className, ...props }) => {
    const classes = classNames(styles.root, className);

    return (
        <footer className={classes} {...props}>
            <SectionEditButton target={ContentSection.Footer} label="footer" />
            <div className={styles.inner}>
                <span>
                    <EditableText section={ContentSection.Footer} path="footer.copyright" />
                </span>
                <ul className={styles.links}>
                    <li>
                        {firstLink === 'email' ? (
                            <a href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
                        ) : (
                            <Link to="/">Home</Link>
                        )}
                    </li>
                    <li>
                        <a href={GITHUB} {...EXTERNAL}>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href={CV_PATH} {...EXTERNAL}>
                            CV
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default PageFooter;
