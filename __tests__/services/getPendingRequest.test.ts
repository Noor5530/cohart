import { getPendingRequest } from 'services/getPendingRequest';

test("", () => {
    let response = getPendingRequest({})
    expect(response).not.toBeNull()
})