import Decimal from 'decimal.js';
import { create } from 'zustand';

import { browserStorage } from '@/utils/browserStorage';

export const useQuote = create((set, get) => ({
    quote: browserStorage.get('quote') ?? { items: [], subtotal: 0, grandTotal: 0 },
    setQuote: (quote) => set({ quote }),
    addToCart: (product) => {
        const currentQuote = get().quote;

        currentQuote.items.push(product);
        currentQuote.subtotal = Decimal.sum(currentQuote.subtotal, product.price).toFixed(2);
        currentQuote.grandTotal = Decimal.sum(currentQuote.grandTotal, product.price).toFixed(2);

        set({ quote: currentQuote });
        browserStorage.set('quote', currentQuote);
    },
    removeFromCart: (product) => {
        const currentQuote = get().quote;

        currentQuote.items = currentQuote.items.filter((item) => item.id !== product.id);
        currentQuote.subtotal = Decimal.sub(currentQuote.subtotal, product.price).toFixed(2);
        currentQuote.grandTotal = Decimal.sub(currentQuote.grandTotal, product.price).toFixed(2);

        set({ quote: currentQuote });
        browserStorage.set('quote', currentQuote);
    }
}));
