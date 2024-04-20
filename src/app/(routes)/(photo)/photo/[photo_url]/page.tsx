const PhotoPage = async ({
    params,
    searchParams,
}: {
    params: { photo_url: string };
    searchParams: { id: string };
}) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img
                alt="photo"
                src={`https://test.yunikeil.ru/attacment/getfile/${params.photo_url}?id=${searchParams.id}`}
            />
        </div>
    );
};

export default PhotoPage;
