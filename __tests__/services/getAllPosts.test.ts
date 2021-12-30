import { getAllPosts } from 'services/getAllPosts';

test("", () => {
    let response = getAllPosts({})
    expect(response).not.toBeNull()
})