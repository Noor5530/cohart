import { addUserInformation } from 'services/addUserInformation';

test("", () => {
    let response = addUserInformation({})
    expect(response).not.toBeNull()
})