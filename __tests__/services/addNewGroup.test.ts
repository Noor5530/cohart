import { addNewGroup } from 'services/addNewGroup';

test("", () => {
    let response = addNewGroup({})
    expect(response).not.toBeNull()
})