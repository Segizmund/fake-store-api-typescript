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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(6);


    const fecthProduct = useCallback( async() =>{
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    if (product) {
        for (let i = 1; i <= Math.ceil(product.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    console.log(product)
    return (
        <>
        <div className={'grid grid-cols-[1fr_4fr] gap-4'}>
            div
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                {loading && <p>Загрузка товаров...</p>}
                {error && <p>Ошибка: {error}</p>}
                {currentProducts && currentProducts.map((product) => (
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
                {product && product.length > productsPerPage && (
                    <div className={'col-span-2 mt-4 flex justify-center mb-6'}>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${currentPage === number ? 'bg-[#D65A31] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
            </>
    )
}

export default App
