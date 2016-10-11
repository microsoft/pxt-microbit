#!/bin/sh
set -e
set -x
export KS_FORCE_CLOUD=yes
(cd libs/lang-test0; node ../../node_modules/pxt-core/built/pxt.js run)
(cd libs/lang-test1; node ../../node_modules/pxt-core/built/pxt.js run)
(cd libs/lang-test0; node ../../node_modules/pxt-core/built/pxt.js test)
(cd libs/lang-test1; node ../../node_modules/pxt-core/built/pxt.js test)
node node_modules/pxt-core/built/pxt.js testdir tests
(cd libs/hello; node ../../node_modules/pxt-core/built/pxt.js testconv https://az851932.vo.msecnd.net/files/td-converter-tests-v1.json)
