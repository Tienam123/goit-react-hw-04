import ImageCard from "@/components/ImageCard/ImageCard.jsx";


const ImageGallery = ({
                          gallery,
                          increasePage,
                          setCurrentImageInModal,
                          openModal,
                      }) => {


    return (
        <>
            <ul className='flex justify-center my-5 items-center gap-5 flex-wrap'>
                {gallery.map((image) => (
                    <ImageCard key={image.id}
                               setCurerentImageInModal={setCurrentImageInModal}
                               preview={image.previewURL}
                               largeImg={image.largeImageURL}
                               openModal={openModal}
                    />
                ))}
            </ul>
            <button onClick={increasePage}
                    className='py-2 px-5 bg-blue-600 mt-10 block text-white rounded'
            >Load More
            </button>
        </>
    );
};
export default ImageGallery