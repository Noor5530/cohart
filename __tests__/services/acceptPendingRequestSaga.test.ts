import { acceptPendingRequest } from 'services/acceptPendingRequest';

test("", () => {
    let response = acceptPendingRequest({})
    expect(response).not.toBeNull()
})