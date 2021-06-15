<p  align="center"><img  width=100%  src="https://raw.githubusercontent.com/jasonrhaddix/choi-holdings-coding-challenge/master/src/assets/screen.jpg"></p>

# Choi Holdings Coding Challenge

## Overview
This is repository for the Choi Holdings coding challenge for Front-end Vue Engineer.

_Note: I'm still fairly new to Vue3 and wanted to use the Composition API instead of the Options API when building out my components -- so there may be areas where I'm breaking best practices, but I'm gaining familiarity._

My primary focus when building out this project was to demonstrate my strengths with UI and with Vue API, however, to stick to the time constraints I needed to cut corners and some will definitely be noticeable. I will try to highlight some of these changes below including improvements I would make...

##### General
1. Use webpack for code-splitting to improve initial load time. Split dependencies into their own files for http/2 multiplexing where available.
2. Dynamic component loading to only instantiate components when needed.
3. Add a grid system and responsive strat -- Bootstrap, Foundation or even Vuetify for their UI elements. Wallet page should be a grid.
4. CSS is a bit disorganized
5. Create a `normalize` or `reset` stylesheet
6. Error handling and persistence for network connections
7. Componentize reusable elements and emit events where needed, i.e. Checkboxes, logos, etc.
8. Add functionality to change how you connect. All 3 selectors use Metamask.
9. Button selection and disabled states

##### Vuex
1. Use modules and global constants for namespacing (or use `namespaced` prop, whichever you prefer)
2. Use getters more frequently to fetch and modify state data.

##### Vue-router
1. Use route modules
2. Navigation guards should be in their own file(s) depending on needs

---

## What Works
1. Connecting using Metamask (The network selectors don't define how you want to connect, all will use Metamask)
2. Navigating to next view once connected. 
3. Preventing navigation to Wallet before being connected
3. Checkboxes as a gate befor allowing to connect
3. Displaying the wallet balance.

---

## Isssue
1. For some reason my IP is locked out for a few hours for spamming the faucet. I was messing around with the Ropsten test network and apparently they have limits. Oops.
---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```