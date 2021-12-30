import { updateBioProfile } from 'services/updateBioProfile';

test("", () => {
    let response = updateBioProfile({})
    expect(response).not.toBeNull()
})