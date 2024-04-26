import React from 'react';
import { useNavigate } from 'react-router-dom';

function ItemDescription() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    const placeholderImage = 'https://via.placeholder.com/150';

    // Define image with placeholder
    const images = Array(3).fill({ src: placeholderImage, alt: 'Placeholder' });
    const itemDetails = {
        title: 'Accessory Box',
        category: 'Furniture',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non lectus at neque dignissim finibus. Nullam vitae lectus felis. In dictum ultrices tempor. Praesent tincidunt ut libero ut ultrices. Morbi gravida eleifend nisl, sed finibus ipsum sollicitudin vel. Donec cursus orci ut pharetra sollicitudin. Integer ultricies, libero id semper porttitor, quam nunc ullamcorper erat, vel volutpat leo velit at diam. Mauris a viverra purus.',
        price: 'Item Price',
        paymentMethod: 'Payment Method',
        deliveryMethod: 'Delivery Method',
    };


    return (
        <div className="flex flex-col items-center min-h-screen bg-white font-interextra">
            {/* Header */}
            <div className="flex flex-col items-center pt-16 bg-white font-inter pb-5">
                <div className="text-xl font-interbold leading-5 text-black mb-2">PennMart</div>
                <div className="flex gap-10 justify-between pr-0 mt-2 text-lg font-inter leading-8 text-black">
                    <button type="button" onClick={goHome}>Home</button>
                    <button type="button">About Us</button>
                </div>
            </div>
                <main className="flex-grow max-w-7xl mt-5 px-40">
                <div className="flex justify-start space-x-5 mt-0">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className="w-48 h-48 object-cover rounded-md"
                        />
                    ))}
                </div>
                    <div className="flex items-start space-x-5 mt-6 mb-3 text-blue-950">
                        <h2 className="text-5xl font-interbold tracking max-md:text-4xl ">{itemDetails.title}</h2>
                        <p className="mt-3 text-2xl font-inter">{itemDetails.category}</p>
                    </div>
                    <div className="mt-2.5 max-md:max-w-full">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
                                <p className="grow justify-center px-4 py-3 w-full text-base font-inter leading-6 bg-white rounded-lg border-2 border-solid shadow-sm border-blue-950 text-zinc-500 max-md:mt-9 max-md:max-w-full font-inter">
                                    {itemDetails.description}
                                </p>
                            </div>
                            <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow leading-[150%] max-md:mt-9">
                                    <div className="flex flex-col px-12 py-9 text-base font-inter bg-white rounded-xl border-2 border-solid border-blue-950 text-zinc-500 max-md:px-5">
                                        <div className="justify-center px-4 py-3 bg-white rounded-lg border-2 border-solid shadow-sm border-blue-950 max-md:pr-5">Item Price</div>
                                        <div className="justify-center px-4 py-3 mt-3 bg-white rounded-lg border-2 border-solid shadow-sm border-blue-950 max-md:pr-5">Payment Method</div>
                                        <div className="justify-center px-4 py-3 mt-3 bg-white rounded-lg border-2 border-solid shadow-sm border-blue-950 max-md:pr-5">Delivery Method</div>
                                    </div>
                                    <button className="justify-center items-center px-4 py-3.5 mt-6 text-2xl font-inter text-green-500 whitespace-nowrap bg-white rounded-lg border-4 border-green-500 border-solid max-md:px-5">Purchase</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Footer */}
                <div className="flex flex-col self-stretch px-20 pb-20 mt-10 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
                    <div className="shrink-0 h-px border border-solid bg-neutral-200 border-neutral-200 max-md:max-w-full" />
                    <div className="flex gap-5 justify-between mt-12 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                        <div className="self-start text-xl font-interbold leading-8 text-black">
                            PennMart
                        </div>
                        <div className="flex gap-2">
                            <img
                                alt="Facebook"
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7eb87e928dad6dfff7398015c472d3e6d7382b528ad963d8da724cca54c0845?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                                className="shrink-0 w-10 aspect-square"
                            />
                            <img
                                alt="Linkedin"
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1bac3668b19309ab1c82835d154f9962b24bad9c262723d53374e3173c3e762?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                                className="shrink-0 w-10 aspect-square"
                            />
                            <img
                                alt="Youtube"
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9c8d64becb556072cf4288b2dadd32d18a3ce8e19d5cc15f298f66d1125313b?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                                className="shrink-0 w-10 aspect-square"
                            />
                            <img
                                alt="Instagram"
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0828515f09127d365461d17e1036e88788811bd5c0258116139d171a870fbe56?apiKey=2bd6a5e8dbb049c2afae4d4eb0812ac6&"
                                className="shrink-0 w-10 aspect-square"
                            />
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ItemDescription;