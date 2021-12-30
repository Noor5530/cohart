import { updateUserView } from 'services/updateUserView';

test("", () => {
    let response = updateUserView({})
    expect(response).not.toBeNull()
})