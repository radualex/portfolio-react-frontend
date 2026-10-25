import React, { useCallback } from 'react';

// Constants
import { SECTIONS } from './constants';
import { ButtonSize } from '@/components/Button/constants';
import type { SectionKey } from '@/store/constants';

// Components
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import { useToast } from '@/components/Toast/ToastContext';

// Store
import { useStore } from '@/store/StoreContext';

// Styles
import styles from './styles.module.scss';

export interface Props extends Omit<React.ComponentProps<typeof Panel>, 'title' | 'note' | 'action' | 'children'> {}

const SectionsPanel: React.FunctionComponent<Props> = (props) => {
    const { state, toggleSection } = useStore();
    const toast = useToast();

    const handleToggle = useCallback((key: SectionKey, isVisible: boolean) => {
        toggleSection(key);
        toast(isVisible ? 'Section hidden' : 'Section shown');
    }, [toggleSection, toast]);

    return (
        <Panel title="Sections" note="Hide a section without deleting its content." {...props}>
            <div className={styles.list}>
                {SECTIONS.map((section) => {
                    const isVisible = state.sections[section.key];

                    return (
                        <div className={styles.row} key={section.key}>
                            <div className={styles.rowMain}>
                                <h3>{section.label}</h3>
                                <p className={styles.description}>{section.description}</p>
                            </div>

                            <div className={styles.rowActions}>
                                <span className={styles.state}>
                                    {isVisible ? 'Visible' : 'Hidden'}
                                </span>
                                <Button size={ButtonSize.Sm} onClick={handleToggle.bind(undefined, section.key, isVisible)}>
                                    {isVisible ? 'Hide' : 'Show'}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Panel>
    );
};

export default SectionsPanel;
