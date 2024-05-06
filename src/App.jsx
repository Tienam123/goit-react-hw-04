import SearchBar from "@/components/SearchBar/SearchBar.jsx";
import {useEffect, useState} from "react";
import ImageGallery from "@/components/ImageGallery/ImageGallery.jsx";
import {getImagesPixabay} from "@/services/apiService.js";
import {useQuery} from "@tanstack/react-query";
import Modal from "react-modal";
import ImageModal from "@/components/ImageModal/ImageModal.jsx";
import {lockedScroll} from "@/services/lockedScroll.js";
import Loader from "@/components/Loader/Loader.jsx";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.jsx";

const App = () => {
    //State Options
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImageModal, setCurrentImageModal] = useState('')
    const {
        data,
        error,
        isError,
        refetch,
        isFetching
    } = useQuery({
        queryFn: () => getImagesPixabay(query, page),
        queryKey: ['images'],
        enabled: query.trim() !== ""
    })

    useEffect(() => {
        refetch()
    }, [
        query,
        page
    ]);

    //ChangeState Functions
    const increasePage = () => {
        setPage(prevState => prevState + 1)
    }
    const resetPage = () => {
        setPage(1)
    }

    const handleCloseModal = () => {
        lockedScroll(modalIsOpen)
        setModalIsOpen(false)
    }
    const handleOpenModal = () => {
        lockedScroll(modalIsOpen)
        setModalIsOpen(true)
    }
    const setCurrentImage = (image) => {
        setCurrentImageModal(image)
    }

    //Render Options
    if (isFetching) {

        return <>
            <SearchBar changeQuery={setQuery}
                       resetPage={resetPage}
            />
            <Loader/>
        </>
    }

    if (isError) {
        return <>
            <SearchBar changeQuery={setQuery}
                       resetPage={resetPage}
            />
            <ErrorMessage/>
        </>
    }

    if (data?.hits?.length === 0) {
        return <>
            <SearchBar changeQuery={setQuery}
                       resetPage={resetPage}
            />
            Данные закончились. Пожалуйста перезагрузите страничку
        </>

    }
    return <>{data?.hits && (
        <div className='w-full flex flex-col items-center pb-24'>
            <SearchBar changeQuery={setQuery}
                       resetPage={resetPage}
            />
            <ImageGallery gallery={data.hits}
                          openModal={handleOpenModal}
                          closeModal={handleCloseModal}
                          setCurrentImageInModal={setCurrentImage}
                          increasePage={increasePage}
                          modalIsOpen={modalIsOpen}
            />
        </div>
    )}
        <ImageModal
            handleClose={handleCloseModal}
            modalIsOpen={modalIsOpen}
        >
            <img src={currentImageModal}
                 className='w-full h-full'
                 alt='image'
            />
        </ImageModal>
    </>


};
export default App;
