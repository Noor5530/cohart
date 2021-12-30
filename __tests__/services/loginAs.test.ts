import { loginAs } from 'services/loginAs';

test("", () => {
    let response = loginAs({})
    expect(response).not.toBeNull()
})