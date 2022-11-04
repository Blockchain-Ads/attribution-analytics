[![npm version](https://badge.fury.io/js/bca-web3-lib.svg)](https://badge.fury.io/js/bca-web3-lib)

# Blockchain Ads web3 connect library

> Write a project description

This is a library to connect user across web3 platform.

## Prerequisites

This project requires NodeJS (version v16.17.1 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
8.11.0
v17.6.0
```

## Table of contents

- [Blockchain Ads web3 connect library](#Blockchain-Ads-web3-connect-library)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Develop repository locally](#Develop-repository-locally)
  - [Library usage](#Library-usage)
    - [To connect user account with Blockchain Ads](#To-connect-user-account-with-Blockchain-Ads)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

<iframe src="https://codesandbox.io/embed/npm-bcaweb3connect-wgqqty?fontsize=14&hidenavigation=1&theme=dark"

[![Edit npm-bcaWeb3Connect](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/npm-bcaweb3connect-wgqqty?fontsize=14&hidenavigation=1&theme=dark)

## Develop repository locally

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/Blockchain-Ads/attribution-analytics.git
$ cd attribution-analytics
```

To install and set up the library, run:

```sh
$ npm install -S bca-web3-lib
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev bca-web3-lib
```

### Watching library

```sh
$ npm dev
```

### Running the tests

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

## Library usage

### To connect user account with Blockchain Ads

```js
import { bcaWeb3Connect } from "bca-web3-lib";
bcaWeb3Connect("0x7Da81FA63Ee343De9ca33ab7A16be3D022549828");
```

This will
1. check if there is Blockchain Ads cookie or local storage exist locally
2. Generate and gather user attribution
3. Call register user API to Blockchain Ads backend
4. Create cookie and local storage to store token locally


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:


## Built With

* microbundle
* JavaScript
* Atom
* Love

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Napat Charuphant** - *Initial work* - [Pat](https://github.com/SuperCipher)


## License

Copyright © 2021 Blockchain-Ads All rights reserved.
