import { useShoppingCart } from 'use-shopping-cart';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Alışveriş sepeti verilerini getir
        const { cartDetails } = useShoppingCart();
        res.status(200).json({ cartDetails });
    } else if (req.method === 'POST') {
        // Alışveriş sepetine ürün ekle
        const { addItem } = useShoppingCart();
        addItem(req.body);
        res.status(200).json({ message: 'Ürün sepete eklendi' });
    } else {
        res.status(405).json({ message: 'Bu metod desteklenmiyor' });
    }
}
