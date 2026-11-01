import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { Combobox } from '@base-ui/react/combobox';
import { Check, X } from 'lucide-react';

// Constants
import { NO_SUGGESTIONS } from './constants';

// Styles
import styles from './styles.module.css';

// Types
import type { PillOption } from './types';

export interface Props extends Omit<React.ComponentProps<'div'>, 'onChange'> {
    id: string;
    label: string;
    value: string[];
    onChange: (next: string[]) => void;
    suggestions?: string[];
    placeholder?: string;
    hint?: React.ReactNode;
    full?: boolean;
}

const PillField: React.FunctionComponent<Props> = ({ id, label, value, onChange, suggestions = NO_SUGGESTIONS, placeholder = 'Add an item', hint, full, className, ...props }) => {
    const classes = classNames(styles.root, {
        [styles.full]: full
    }, className);
    const [query, setQuery] = useState('');

    const items = useMemo<PillOption[]>(() => {
        const seen = new Set<string>();
        const all = [...suggestions, ...value];

        return all.filter((item) => {
            const key = item.trim().toLowerCase();

            if (!key || seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;
        }).map((item) => {
            return {
                value: item,
                label: item
            };
        });
    }, [suggestions, value]);

    const selected = useMemo<PillOption[]>(() => {
        return value.map((item) => {
            return {
                value: item,
                label: item
            };
        });
    }, [value]);

    const trimmed = query.trim();
    const isExact = items.some((item) => {
        return item.label.toLowerCase() === trimmed.toLowerCase();
    });

    const visibleItems = useMemo<PillOption[]>(() => {
        if (!trimmed || isExact) {
            return items;
        }

        return [
            ...items, {
                value: trimmed,
                label: `Create "${trimmed}"`,
                create: true
            }];
    }, [isExact, items, trimmed]);

    const handleValueChange = useCallback((next: PillOption[]) => {
        onChange(next.map((item) => {
            return item.value;
        }));
        setQuery('');
    }, [onChange]);

    const handleInputChange = useCallback((next: string) => {
        setQuery(next);
    }, []);

    const getItemLabel = useCallback((item: PillOption) => {
        return item.label;
    }, []);

    const isSameItem = useCallback((item: PillOption, current: PillOption) => {
        return item.value === current.value;
    }, []);

    return (
        <div className={classes} {...props}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>

            <Combobox.Root items={visibleItems} multiple value={selected} onValueChange={handleValueChange} inputValue={query} onInputValueChange={handleInputChange} autoHighlight itemToStringLabel={getItemLabel} isItemEqualToValue={isSameItem}>
                <Combobox.InputGroup className={styles.inputGroup}>
                    <Combobox.Value>
                        {(selectedItems: PillOption[]) => {
                            return (
                                <Combobox.Chips className={styles.chips} aria-label={selectedItems.length > 0 ? `${label} selected` : undefined}>
                                    {selectedItems.map((item) => {
                                        return (
                                            <Combobox.Chip className={styles.chip} key={item.value} aria-description="Press Backspace or Delete to remove">
                                                {item.label}
                                                <Combobox.ChipRemove className={styles.remove} aria-label={`Remove ${item.label}`}>
                                                    <X size="0.75rem" aria-hidden />
                                                </Combobox.ChipRemove>
                                            </Combobox.Chip>
                                        );
                                    })}
                                    <Combobox.Input className={styles.input} id={id} placeholder={selectedItems.length > 0 ? '' : placeholder} aria-describedby={hint ? `${id}-hint` : undefined} aria-description={selectedItems.length > 0 ? 'Press Left Arrow to focus selected items; Backspace or Delete removes one' : undefined} />
                                </Combobox.Chips>
                            );
                        }}
                    </Combobox.Value>
                </Combobox.InputGroup>

                <Combobox.Portal>
                    <Combobox.Positioner className={styles.positioner} sideOffset={4}>
                        <Combobox.Popup className={styles.popup}>
                            <Combobox.Empty className={styles.empty}>
                                No matches.
                            </Combobox.Empty>
                            <Combobox.List className={styles.list}>
                                {(item: PillOption) => {
                                    return (
                                        <Combobox.Item className={styles.item} key={item.value} value={item}>
                                            <Combobox.ItemIndicator className={styles.indicator}>
                                                <Check size="0.875rem" aria-hidden />
                                            </Combobox.ItemIndicator>
                                            <span>{item.label}</span>
                                        </Combobox.Item>
                                    );
                                }}
                            </Combobox.List>
                        </Combobox.Popup>
                    </Combobox.Positioner>
                </Combobox.Portal>
            </Combobox.Root>

            {hint ? (
                <p className={styles.hint} id={`${id}-hint`}>
                    {hint}
                </p>
            ) : undefined}
        </div>
    );
};

export default PillField;
