import { deleteWork } from 'services/deleteWork';

test("", () => {
    let response = deleteWork({})
    expect(response).not.toBeNull()
})