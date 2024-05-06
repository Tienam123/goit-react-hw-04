import {CiSearch} from "react-icons/ci";
import {useFormik} from "formik";

const SearchBar = ({
                       changeQuery,
                       resetPage
                   }) => {
    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            resetPage()
            changeQuery(values.query)
            resetForm()
        },
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}
                  className='flex justify-center w-full bg-blue-700 py-5'
            >
                <label className='relative w-1/5'>
                    <input type='text'
                           value={formik.values.query}
                           onChange={formik.handleChange}
                           name='query'
                           className='border w-full border-solid rounded border-blue-600 pl-8 py-2'
                    />
                    <button className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-4'
                            type='submit'
                    >
                        <CiSearch size={22}/>
                    </button>

                </label>
            </form>
        </>
    );
};
export default SearchBar