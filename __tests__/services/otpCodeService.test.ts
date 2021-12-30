import { sendOtpCodeByUserCode as otpCodeService } from 'services/otpCodeService';
import { sendOtpCodeByPhoneNumber } from 'services/otpCodeService';
import { sendOtpCodeByEmail } from 'services/otpCodeService';

test("", () => {
    let response = otpCodeService({})
    expect(response).not.toBeNull()
})
test("", () => {
    let response = sendOtpCodeByPhoneNumber({})
    expect(response).not.toBeNull()
})
test("", () => {
    let response = sendOtpCodeByEmail({})
    expect(response).not.toBeNull()
})