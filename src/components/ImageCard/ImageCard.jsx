import style from "./ImageCard.module.css";

const ImageCard = ({
                       card,
                       setImageModal,
                       toggleModal,
                   }) => {
    const handleClickCard = () => {
        setImageModal(card.urls.full);
        toggleModal()
    }
    return (
        <li className={`h-80 ${style.card}`}

        >
            <img src={card.urls.raw}
                 onClick={handleClickCard}
                 loading='lazy'
                 className='w-full h-full'
                 alt=''
            />
        </li>
    );
};
export default ImageCard