import { fetchALLGroup } from 'services/fetchAllGroup';

test("", () => {
    let response = fetchALLGroup({})
    expect(response).not.toBeNull()
})