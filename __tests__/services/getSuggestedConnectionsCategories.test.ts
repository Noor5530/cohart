import { getSuggestedConnectionsCategories } from 'services/getSuggestedConnectionsCategories';

test("", () => {
    let response = getSuggestedConnectionsCategories({})
    expect(response).not.toBeNull()
})