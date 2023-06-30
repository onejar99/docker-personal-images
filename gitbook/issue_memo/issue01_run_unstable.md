# [Issue] Errors sometimes when run `gitbook build` or `gitbook serve`

## Situation

有時候 gitbook build 或 gitbook serve 會出現以下 error:
```bash
Error: ENOENT: no such file or directory, stat '/gitbook/_book/gitbook/gitbook-plugin-fontsettings/fontsettings.js'
# or
Error: ENOENT: no such file or directory, stat '/gitbook/_book/gitbook/gitbook-plugin-lunr/lunr.min.js'
# or
Error: ENOENT: no such file or directory, stat '/gitbook/_book/gitbook/gitbook-plugin-highlight/ebook.css'
# or
Error: ENOENT: no such file or directory, stat '/gitbook/_book/gitbook/gitbook-plugin-sharing/buttons.js'
# and so on
```

例如：

```bash
$ docker run --rm -ti -p 5003:4000 -v $(pwd):/gitbook onejar99/gitbook:light "gitbook build"
info: 9 plugins are installed
info: 8 explicitly listed
info: loading plugin "back-to-top-button"... OK
info: loading plugin "intopic-toc"... OK
info: loading plugin "highlight"... OK
info: loading plugin "search"... OK
info: loading plugin "lunr"... OK
info: loading plugin "sharing"... OK
info: loading plugin "fontsettings"... OK
info: loading plugin "theme-default"... OK
info: found 5 pages
info: found 268 asset files

Error: ENOENT: no such file or directory, stat '/gitbook/_book/gitbook/gitbook-plugin-fontsettings/fontsettings.js'
$
```

再執行一次可能就能過，但出現頻率有點高，測試 failure ratio 超過 50% (13/20)，以工具來說太不穩定。


## Solution

似乎是 gitbook 3.2.3 的 bug，網友推薦低版本 Node V6 和 gitbook 2.6.7~2.6.4。
後來以 `try to fix 2` 解決，測試 failure ratio: 0/10。


## [try to fix 1] fix cpr@3 on node:12.16.1 (not work)**
```
Bug in confirm: true is fixed in cpr@3 (davglass/cpr#57), but gitbook still depends on cpr@1.

Installation of patched cpr using gitbook's npm:

cd ~/.gitbook/versions/3.2.3
npx npm install cpr@3
```

## [try to fix 2] fix copyPluginAssets.js**

```bash
## vim /root/.gitbook/versions/<gitbook-version>/lib/output/website/copyPluginAssets.js
$ vim /root/.gitbook/versions/3.2.3/lib/output/website/copyPluginAssets.js
```
line 112 的 `confirm: true` 改 `confirm: false`:
```js
    logger.debug.ln('copy resources from plugin', assetsFolder);

    return fs.copyDir(
        assetsFolder,
        assetOutputFolder,
        {
            deleteFirst: false,
            overwrite: true,
            confirm: true // <--- here
        }
    );
```

## References

- [gitbook serve error with ENOENT: no such file or directory(fontsettings.js&website.css) · Issue #55 · GitbookIO/gitbook-cli · GitHub](https://github.com/GitbookIO/gitbook-cli/issues/55)
- [gitbook serve命令找不到fontsettings.js - segmentfault](https://segmentfault.com/q/1010000009569245)
