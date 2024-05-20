import Loader from "@/components/Loader/Loader.jsx";

const LoadMoreButton = ({
                            fetchNext,
                            isFetching
                        }) => {
    return (
        <>
            {isFetching
                ? (<Loader />)
                : (<button onClick={fetchNext}
                           disabled={isFetching}
                           className='py-2 px-5 bg-blue-600 mt-10 block text-white mx-auto rounded'
                >Load More
                </button>)
            }
        </>
    );
};
export default LoadMoreButton