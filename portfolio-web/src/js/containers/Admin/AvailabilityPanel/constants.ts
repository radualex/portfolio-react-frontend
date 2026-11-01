// Constants
import { AvailabilityState } from '@/store/constants';

// Types
import type { StateOption } from './types';

export const STATES = [{
    value: AvailabilityState.Available,
    label: 'Available'
},
{
    value: AvailabilityState.Unavailable,
    label: 'Not available'
}] as const satisfies readonly StateOption[];

export const LIMIT = 160;
