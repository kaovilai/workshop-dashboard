#!/bin/bash

set -x

if [ -f /opt/workshop/envvars/workshop.sh ]; then
    set -a
    . /opt/workshop/envvars/workshop.sh
    set +a
fi

if [ -f /opt/app-root/envvars/workshop.sh ]; then
    set -a
    . /opt/app-root/envvars/workshop.sh
    set +a
fi

if [ x"$WORKSHOPS_URLS" != x"" ]; then
    exec /opt/workshop/bin/start-workshopper.sh
fi

if [ -f /opt/app-root/workshop/_workshop.yml ]; then
    export WORKSHOPS_URLS="file:///opt/app-root/workshop/_workshop.yml"
    exec /opt/workshop/bin/start-workshopper.sh
fi

if [ -f /opt/app-root/src/workshop/_workshop.yml ]; then
    export WORKSHOPS_URLS="file:///opt/app-root/src/workshop/_workshop.yml"
    exec /opt/workshop/bin/start-workshopper.sh
fi

exec /opt/workshop/bin/start-raneto.sh
