const ImageCard = ({
                       largeImg,
                       preview,
                       openModal,
                       setCurerentImageInModal,
                   }) => {
    const handleClickCard = () => {
        setCurerentImageInModal(largeImg)
        openModal()
    }

    return (
        <li className='w-1/4 h-80'
            onClick={handleClickCard}
        >
            <img src={preview}
                 className='w-full h-full'
                 alt=''
            />
        </li>
    );
};
export default ImageCard