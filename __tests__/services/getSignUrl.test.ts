import { getSignUrl } from 'services/getSingUrl';

test("", () => {
    let response = getSignUrl({})
    expect(response).not.toBeNull()
})