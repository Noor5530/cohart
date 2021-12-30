import { addUserProfile } from 'services/addUserProfile';

test("", () => {
    let response = addUserProfile({})
    expect(response).not.toBeNull()
})