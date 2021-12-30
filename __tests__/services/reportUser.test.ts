import { reportUser } from 'services/reportUser';

let reported_by_id = 111;
let reported_user_id: 222;
let report_option: 333;
test("", () => {
    let response = reportUser({ report_option, reported_user_id, reported_by_id })
    expect(response).not.toBeNull()
})