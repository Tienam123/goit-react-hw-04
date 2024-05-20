import SearchBar from "@/components/SearchBar/SearchBar.jsx";
import {useState} from "react";
import ImageGallery from "@/components/ImageGallery/ImageGallery.jsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getImages} from "@/services/apiService.js";
import ImageCard from "@/components/ImageCard/ImageCard.jsx";
import LoadMoreButton from "@/components/LoadMoreBtn/LoadMoreButton.jsx";
import ImageModal from "@/components/ImageModal/ImageModal.jsx";
import Loader from "@/components/Loader/Loader.jsx";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.jsx";

const App = () => {
    const [query, setQuery] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImageModal, setCurrentImageModal] = useState('')
    const handleToggleModal = () => setModalIsOpen(!modalIsOpen);
    const setNewQuery = query => setQuery(query);
    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [query],
        queryFn: ({pageParam}) => getImages(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam <= lastPage.total_pages) {
                return lastPageParam + 1;
            }
        },
        enabled: !!query
    })

    if (isError) {
        return (
            <>
                <SearchBar setNewQuery={setNewQuery} />
                <ErrorMessage error={error} />
            </>
        )

    }

    if (isLoading) {
        return (
            <>
                <SearchBar setNewQuery={setNewQuery} />
                <Loader />
            </>
        )
    }

    return (
        <>

            <SearchBar setNewQuery={setNewQuery} />

            {data
                && (
                    <ImageGallery>
                        {data?.pages.map((page, i) => {
                            return isLoading
                                ? (<Loader key={i} />)
                                : page.results.map((el) => {
                                    return (
                                        <ImageCard key={el.id}
                                                   card={el}
                                                   toggleModal={handleToggleModal}
                                                   setImageModal={setCurrentImageModal}
                                        />
                                    )
                                })
                        })}
                    </ImageGallery>
                )}
            {hasNextPage && (
                <LoadMoreButton
                    isFetching={isFetchingNextPage}
                    fetchNext={fetchNextPage}
                />
            )}
            <ImageModal modalIsOpen={modalIsOpen}
                        handleClose={handleToggleModal}
            >
                <img src={currentImageModal}
                     className='w-full h-full'
                     alt=''
                />
            </ImageModal>
        </>
    )


};
export default App;
