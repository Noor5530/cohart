import { getSavedWork } from 'services/getSavedWork';

test("", () => {
    let response = getSavedWork({})
    expect(response).not.toBeNull()
})