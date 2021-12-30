import { deletePost } from 'services/deletePost';

let post_id = 1234;
let id = 4567;

test("", () => {
    let response = deletePost({ post_id, id })
    expect(response).not.toBeNull()
})