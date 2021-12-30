import { getPostDetail } from 'services/getPostDetail';


test("", () => {
    let response = getPostDetail({})
    expect(response).not.toBeNull()
})