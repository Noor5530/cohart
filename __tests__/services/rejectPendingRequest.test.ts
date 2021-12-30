import { rejectPendingRequest } from 'services/rejectPendingRequest';

test("", () => {
    let response = rejectPendingRequest({})
    expect(response).not.toBeNull()
})