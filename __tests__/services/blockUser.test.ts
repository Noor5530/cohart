import { blockUser } from 'services/blockUser';

let user_id = 111;
let blocked_user_id = 2222;
test("", () => {
    let response = blockUser({ user_id, blocked_user_id })
    expect(response).not.toBeNull()
})