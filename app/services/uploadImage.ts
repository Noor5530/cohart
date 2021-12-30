import RNFetchBlob from 'rn-fetch-blob';

export const uploadImage = async (data) => {
    return await RNFetchBlob.fetch(
        "PUT",
        data.url,
        {
            "Content-Type": data.image_type,
        },
        RNFetchBlob.wrap(data.path)
    );
};