import { getSuggestedConnections } from 'services/getSuggestedConnections';

test("", () => {
    let response = getSuggestedConnections({})
    expect(response).not.toBeNull()
})