Upload react native build to testFlight

1. open ios/cohart.xcworkspace in xcode
   2.login with apple account in xcode
   3.open signing & capabilities and add bundle identifier

4.check automatically manage signing
5.visit https://developer.apple.com/
6.login with apple account
7.click on Certificates, Identifiers & Profiles
8.if Identifiers not register, than click on Identifiers and Register a new identifier

- go to https://appstoreconnect.apple.com and add new app with identifiers
  9.than click on Certificates,

10. create these certificates if not available.other wise download and import in keychain

- Development certificates
- IOS Development certificates
- iOS Distribution
- Distribution
  11.how to create .certSigningRequest for create certSigningRequest
   - open keychain 
   - click request a certificate from a certificate Authority and enter email ,click on save in disk and click on continue 
  12 select devices from top bar: Any IOS Device from
   1.  select product from top bar than click on Archive

1.  After complete Archive .validate build. than distribute app
    15.After distribution .goto https://appstoreconnect.apple.com 
    16.click test flight .submit app for review .than its available for testing
