import { getUserInformation } from 'services/getUserInformation';

test("", () => {
    let response = getUserInformation({})
    expect(response).not.toBeNull()
})