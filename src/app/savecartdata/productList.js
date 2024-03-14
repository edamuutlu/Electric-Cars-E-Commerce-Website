"use client";

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

