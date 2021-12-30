/*
 * Reducer actions related with navigation
 */
import NavigationService from 'navigation/NavigationService';

export function navigateToSignUp(params?: any) {
  NavigationService.navigate('SignUp', params);
}

export function navigateToOtpVerification(params: any) {
  NavigationService.navigate('CohartLoginCode', params);
}

export function navigateToHome(params: any) {
  NavigationService.navigate('Home', params);
}
export function navigateToProfile(params: any) {
  NavigationService.navigate('Profile', params);
}
export function navigateToMyProfile(params: any) {
  NavigationService.navigate('MyProfile', params);
}
export function navigateToDiscover(params: any) {
  NavigationService.navigate('Discover', params);
}
export function navigateToDiscoverFirstTime(params: any) {
  NavigationService.navigate('DiscoverFirstTime', params);
}

export function navigateToTopic(params: any) {
  NavigationService.navigate('InterestingTopic', params);
}
export function navigateToForgotPassword(params?: any) {
  NavigationService.navigate('ForgotPassword', params);
}
export function navigateToForgotSignUp(params?: any) {
  NavigationService.navigate('SignUp', params);
}
export function reset() {
  NavigationService.reset();
}

export function navigateToCommunity(params: any) {
  NavigationService.navigate('Community', params);
}

export function navigateToWelcome(params: any) {
  NavigationService.navigate('Welcome', params);
}