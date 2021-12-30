import { updatePhoneNumber } from 'services/updatePhoneNumber';

test("", () => {
    let response = updatePhoneNumber({})
    expect(response).not.toBeNull()
})