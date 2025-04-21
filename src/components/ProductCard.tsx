interface ProductCardProps {
    id: string;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    rate: number;
    count: number;
}

function ProductCard({
    id,
    category,
    description,
    image,
    price,
    title,
    rate,
    count,
    }: ProductCardProps) {
    return (
        <>
            <div className={'product-card rounded-xl border-2 border-[#D65A31] p-6 bg-white'}>
                <span
                    className={'border border-[#222831] py-1 px-2 rounded-xl bg-[#222831] text-[#D65A31] mb-3 block w-fit cursor-pointer'}>{category}</span>
                <div>
                    <h2 className={'font-bold line-clamp-1 mb-6 text-[#D65A31] cursor-pointer'}
                        title={title}>{title}</h2>
                    <div className={'grid grid-cols-1 md:grid-cols-[200px_auto] gap-4'}>
                        <div>
                            <img src={image} alt="" className={'h-[250px] w-[200px] object-contain mb-6'}/>
                        </div>
                        <div className={'flex flex-col gap-3'}>
                            <span className={'font-semibold'}>Цена: {price}$</span>
                            <span className={'font-semibold'}>Количество: {count}</span>
                            <span className={'font-semibold'}>Оценка: {rate} / 5</span>
                        </div>
                    </div>
                    <button className={'line-clamp-3 text-[#09122C] cursor-pointer text-start'} popovertarget={`description-modal-${id}`}>{description}</button>
                </div>
            </div>
            <div popover='modal' id={`description-modal-${id}`}
                 className="modal-image transition-discrete starting:open:opacity-0 m-auto fixed open:backdrop-brightness-50 w-fit xl:max-w-1/2  xl:min-w-1/2 min-h-1/2 border-2 border-[#D65A31] rounded-xl p-6 shadow-md shadow-[#D65A31] bg-[#222831]">
                <button popovertarget={`description-modal-${id}`} popovertargetaction="hide" className={'font-semibold text-white border border-[#D65A31] bg-[#D65A31] py-1 px-2 rounded-xl absolute right-2 top-2 cursor-pointer transition duration-300 easy-linear hover:bg-white hover:text-[#D65A31]'}>
                    X
                </button>
                <h2 className={'text-[#D65A31] font-bold mb-3'}>{title}</h2>
                <h2 className={'mb-3 font-semibold text-white'}>Описание:</h2>
                <p className={'text-[#D65A31] mb-3'}>
                    {description}
                </p>
                <div className={'flex gap-3'}>
                    <span className={'text-white border border-[#D65A31] bg-[#D65A31] rounded-xl py-1 px-2 cursor-pointer'}>{category}</span>
                    <span className={'text-white border border-[#D65A31] bg-[#D65A31] rounded-xl py-1 px-2 cursor-pointer'}>{rate}</span>
                    <span className={'text-white border border-[#D65A31] bg-[#D65A31] rounded-xl py-1 px-2 cursor-pointer'}>{price}$</span>
                </div>
            </div>
        </>
    )
}

export default ProductCard;