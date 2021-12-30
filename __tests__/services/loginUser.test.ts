import { loginUser } from 'services/loginUser';

test("", () => {
    let response = loginUser({})
    expect(response).not.toBeNull()
})