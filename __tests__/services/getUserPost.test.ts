import { getUserPost } from 'services/getUserPost';

test("", () => {
    let response = getUserPost({})
    expect(response).not.toBeNull()
})