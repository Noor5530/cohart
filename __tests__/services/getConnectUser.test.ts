import { getConnectUser } from 'services/getConnectUser';

test("", () => {
    let response = getConnectUser({})
    expect(response).not.toBeNull()
})