import { logout } from 'services/logout';

test("", () => {
    let response = logout({})
    expect(response).not.toBeNull()
})