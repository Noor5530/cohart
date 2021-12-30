import { fetchUserWork } from 'services/fetchUserWork';

let page = 1111;
let page_size = 1111;
let user_id = 1111;

test("", () => {
    let response = fetchUserWork({ page, page_size, user_id })
    expect(response).not.toBeNull()
})