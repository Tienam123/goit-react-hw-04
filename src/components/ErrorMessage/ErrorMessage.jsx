const ErrorMessage = () => {
    return (
        <div className='w-svw h-svh flex justify-center items-center'>
            <h2>На сайте произошла ошибка {error.message}. Пожалуйста перезагрузите страничку</h2>
        </div>
    );
};
export default ErrorMessage