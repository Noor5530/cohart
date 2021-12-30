import { uploadBackGroundImage } from 'services/uploadBackGroundImage';

test("", () => {
    let response = uploadBackGroundImage({})
    expect(response).not.toBeNull()
})