/* "use client";

import { useEffect, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const ProductList = () => {
    const { cartDetails } = useShoppingCart();
    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        const ids = Object.values(cartDetails).map(item => item.id);
        setProductIds(ids);
    }, [cartDetails]);

    // Döndürülen değer bir bileşen değil, bu nedenle bu fonksiyonun direkt kullanımı yerine bileşenin kullanılması gerekiyor.
    // Bu dizi direkt olarak dışa aktarılabilir.
    return productIds;
};

export default ProductList;

 */

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
