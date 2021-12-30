import { verifyUsername } from 'services/verifyUsername';

test("", () => {
    let response = verifyUsername({})
    expect(response).not.toBeNull()
})