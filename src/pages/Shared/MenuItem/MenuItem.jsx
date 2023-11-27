

const MenuItem = ({ item }) => {

    const { name, image, price, recipe, } = item;

    return (
        <div className="flex  space-x-4">
            <img className="w-[120px] rounded-tl-[0px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px]" src={image} alt="" />
            <div>
                <h3 className="uppercase font-medium">{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-warning font-bold">${price}</p>
        </div>
    );
};

export default MenuItem;