import './App.css'
import ProductCard from "./components/ProductCard.tsx";
import {useCallback, useEffect, useState} from "react";

interface Rating {
    rate: number;
    count: number;
}

interface Product {
    category: string;
    description: string;
    id: string;
    image: string;
    price: number;
    title: string;
    rating: Rating;
}

function App() {
    const [product,setProduct] = useState <Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    const fecthProduct = useCallback( () =>{
        setLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                setLoading(false);
                setProduct(data);
            })
            .catch(error => {
                console.error('Ошибка при получении Продукта:', error)
                setError('Не удалось получить продукт.')
                setLoading(false)
            });
    },[])

    useEffect( () => {
        fecthProduct();
    },[fecthProduct]);
console.log(product)
    return (
        <div className={'grid grid-cols-[1fr_4fr] gap-4'}>
            div
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                {loading && <p>Загрузка товаров...</p>}
                {error && <p>Ошибка: {error}</p>}
                {product && product.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        category={product.category}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        title={product.title}
                        count={product.rating.count}
                        rate={product.rating.rate}
                    />
                ))}
            </div>
        </div>
    )
}

export default App
