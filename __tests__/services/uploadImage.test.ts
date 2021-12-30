import { uploadImage } from 'services/uploadImage';

test("", () => {
    let response = uploadImage({})
    expect(response).not.toBeNull()
})