import SearchBar from "@/components/SearchBar/SearchBar.jsx";
import {useEffect, useState} from "react";
import ImageGallery from "@/components/ImageGallery/ImageGallery.jsx";
import {getImagesPixabay} from "@/services/apiService.js";
import {useQuery} from "@tanstack/react-query";
import ImageModal from "@/components/ImageModal/ImageModal.jsx";
import {lockedScroll} from "@/services/lockedScroll.js";
import Loader from "@/components/Loader/Loader.jsx";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.jsx";

const App = () => {
    //State Options
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [isInitialLoad, setIsInitialLoad] = useState(false)
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
        queryKey: [
            'images',
            query
        ],
        enabled: !!query
    })

    useEffect(() => {
        if (isInitialLoad) {
            refetch();
        }
        setIsInitialLoad(true)
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
            <ErrorMessage error={error}/>
        </>
    }


    return (
        <>
            <div className='w-full flex flex-col justify-center items-center pb-24'>
                <SearchBar changeQuery={setQuery}
                           resetPage={resetPage}
                />
                {data?.results && data.results.length > 0
                 ? (
                     <ImageGallery gallery={data.results}
                                   openModal={handleOpenModal}
                                   closeModal={handleCloseModal}
                                   setCurrentImageInModal={setCurrentImage}
                                   increasePage={increasePage}
                                   modalIsOpen={modalIsOpen}
                     />
                 )
                 : <h1 className='mt-44 font-semibold text-3xl'>Данных пока нет</h1>}
            </div>
            <ImageModal
                handleClose={handleCloseModal}
                modalIsOpen={modalIsOpen}
            >
                <img src={currentImageModal}
                     className='w-full h-full'
                     alt='image'
                />
            </ImageModal>
        </>)


};
export default App;
