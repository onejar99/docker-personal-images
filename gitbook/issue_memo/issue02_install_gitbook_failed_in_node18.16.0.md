# [Issue] install gitbook failed in Node 18.16.0

## Situation

Cannot install gitbook in Node 18.16.0 image:
```bash
❯ $ docker run -ti --rm node:18.16.0-alpine3.16 /bin/sh
/ #
/ # apk update
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/community/x86_64/APKINDEX.tar.gz
v3.16.6-25-ge34dd25f821 [https://dl-cdn.alpinelinux.org/alpine/v3.16/main]
v3.16.6-26-g7e4db5f9f70 [https://dl-cdn.alpinelinux.org/alpine/v3.16/community]
OK: 17042 distinct packages available
/ # apk add vim unzip
(1/6) Installing unzip (6.0-r9)
(2/6) Installing xxd (8.2.5000-r0)
(3/6) Installing lua5.4-libs (5.4.4-r5)
(4/6) Installing ncurses-terminfo-base (6.3_p20220521-r1)
(5/6) Installing ncurses-libs (6.3_p20220521-r1)
(6/6) Installing vim (8.2.5000-r0)
Executing busybox-1.35.0-r17.trigger
OK: 38 MiB in 22 packages
/ # npm install gitbook-cli -g

added 21 packages in 20s
npm notice
npm notice New minor version of npm available! 9.5.1 -> 9.7.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.7.2
npm notice Run npm install -g npm@9.7.2 to update!
npm notice
/ # gitbook --version
CLI version: 2.3.2
Installing GitBook 3.2.3
/usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287
      if (cb) cb.apply(this, arguments)
                 ^

TypeError: cb.apply is not a function
    at /usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules/graceful-fs/polyfills.js:287:18
    at FSReqCallback.oncomplete (node:fs:209:5)

Node.js v18.16.0
/ #
```

## Sol

```bash
cd /usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules
npm install graceful-fs@latest --save
```


log:
```bash
/ # cd /usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules
/usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules # npm install graceful-fs@latest --save
npm WARN deprecated cryptiles@2.0.5: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
npm WARN deprecated sntp@1.0.9: This module moved to @hapi/sntp. Please make sure to switch over as this distribution is no longer supported and may contain bugs and critical security issues.
npm WARN deprecated boom@2.10.1: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
npm WARN deprecated ignore@2.2.19: several bugs fixed in v3.2.1
npm WARN deprecated circular-json@0.3.3: CircularJSON is in maintenance only, flatted is its successor.
npm WARN deprecated har-validator@2.0.6: this library is no longer supported
npm WARN deprecated hoek@2.16.3: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
npm WARN deprecated request@2.79.0: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated hawk@3.1.3: This module moved to @hapi/hawk. Please make sure to switch over as this distribution is no longer supported and may contain bugs and critical security issues.
npm WARN deprecated coffee-script@1.12.7: CoffeeScript on NPM has moved to "coffeescript" (no hyphen)
npm WARN deprecated npm-registry-mock@1.1.0: This package is deprecated and will not be receiving further updates

added 273 packages, removed 107 packages, changed 2 packages, and audited 865 packages in 44s

18 packages are looking for funding
  run `npm fund` for details

86 vulnerabilities (1 low, 41 moderate, 28 high, 16 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
/usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules #
/usr/local/lib/node_modules/gitbook-cli/node_modules/npm/node_modules # cd -
/
/ # gitbook --version
CLI version: 2.3.2
Installing GitBook 3.2.3
/ #
```

## Ref
* [node.js - Gitbook-cli install error TypeError: cb.apply is not a function inside graceful-fs - Stack Overflow](https://stackoverflow.com/questions/64211386/gitbook-cli-install-error-typeerror-cb-apply-is-not-a-function-inside-graceful)
