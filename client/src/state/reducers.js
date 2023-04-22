import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: [],
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetchCards: (state, action) => {
            return action.payload;
        },
        createCard: (state, action) => {
            state.cards.push(action.payload);
            console.log(action.payload);
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
        },
        updateCard: (state, action) => {
            const updatedCard = action.payload;
            const index = state.cards.findIndex((card) => card.id === updatedCard.id);
            if (index !== -1) {
                state.cards[index] = updatedCard;
            }
        }
    },
});

export const { fetchCards, createCard, removeCard, updateCard } = cardSlice.actions;
export default cardSlice.reducer;