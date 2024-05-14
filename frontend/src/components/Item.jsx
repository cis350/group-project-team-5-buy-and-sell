import React from 'react';
import PropTypes from 'prop-types';

function Item({
    imageSrc1, imageSrc2, itemName, price, savedTimes,
}) {
    return (
        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-8 max-md:mt-10">
                <div className="flex overflow-hidden relative flex-col justify-center w-full aspect-square">
                    <img loading="lazy" src={imageSrc1} alt="" className="object-cover absolute inset-0 size-full" />
                    <img loading="lazy" src={imageSrc2} alt="" className="w-full aspect-square" />
                </div>
                <div className="mt-3 text-xl font-medium leading-8 text-black text-ellipsis">{itemName}</div>
                <div className="text-xl font-semibold leading-8 whitespace-nowrap text-ellipsis text-zinc-700">
                    <span className="text-2xl">{price}</span>
                    <br />
                    <span className="text-base text-zinc-700">{savedTimes}</span>
                </div>
            </div>
        </div>
    );
}

Item.propTypes = {
    imageSrc1: PropTypes.string.isRequired,
    imageSrc2: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    savedTimes: PropTypes.string.isRequired,
};

export default Item;
