import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { cupIcon, ghostIcon, pawIcon } from '../../assets/images/categories/base-categories';

const initialState = [
    {
        name: 'Gameplay',
        description: 'High-quality gameplay',
        img: cupIcon,
        voiceQuantity: '0',
    },
    {
        name: 'Personages',
        description: 'Beautiful personages',
        img: ghostIcon,
        voiceQuantity: '0',
    },
    {
        name: 'Number of levels',
        description: 'Large number of levels',
        img: pawIcon,
        voiceQuantity: '0',
    },
];

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        newCategory: (
            state,
            action: PayloadAction<{ name: string; description: string; img: string; voiceQuantity: string }>,
        ) => {
            state.push({
                name: action.payload.name,
                description: action.payload.description,
                img: action.payload.img,
                voiceQuantity: action.payload.voiceQuantity,
            });
        },
    },
});

export const { newCategory } = ratingSlice.actions;

export default ratingSlice.reducer;