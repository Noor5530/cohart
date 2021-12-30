import { acceptCommunityGuideLines } from 'services/acceptCommunityGuideLines';

test("", () => {
    let response = acceptCommunityGuideLines({})
    expect(response).not.toBeNull()
})