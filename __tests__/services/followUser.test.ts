import { followUser } from 'services/followUser';

let user_id = 111;
let follower_id = 2222;
let unfollow = true;
test("", () => {
    let response = followUser({ user_id, follower_id, unfollow })
    expect(response).not.toBeNull()
})