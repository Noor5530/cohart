import { createUserWithMail } from 'services/createUserWithMail';

test("", () => {
    let response = createUserWithMail({})
    expect(response).not.toBeNull()
})