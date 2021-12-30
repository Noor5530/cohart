import { saveUserInterest } from 'services/saveUserInterest';

test("", () => {
    let response = saveUserInterest({})
    expect(response).not.toBeNull()
})