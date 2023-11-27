
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center">
            <p className="text-warning font-bold italic mb-2 capitalize">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-4 px-4 py-3 inline-block text-[#151515] border-[#E8E8E8]">{heading}</h3>
        </div>
    );
};

export default SectionTitle;