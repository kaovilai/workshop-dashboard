FROM quay.io/openshiftlabs/workshop-dashboard:2.13.0

USER root

# -- Install OPEN-CNS-TESTDRIVE utilities.

RUN HOME=/root && \
    INSTALL_PKGS="jq" && \
    yum install -y centos-release-scl epel-release && \
    yum -y --setopt=tsflags=nodocs install --enablerepo=centosplus $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum -y clean all --enablerepo='*'
    
# -- End OPEN-CNS-TESTDRIVE utilities

USER 1001
