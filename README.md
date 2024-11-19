# NutriVim

## Setup

### Install Expo CLI
`npm install -g eas-cli`

### Log in
`eas login` -> then log in

### Set up project
```
git clone git@github.com:jakedemian/nutri-vim.git
cd nutri-vim
yarn
```

### Start local dev server
`yarn expo start`


## Build APK
`eas build --profile preview --platform android`

wait for build to complete, then scan QR code and download the APK