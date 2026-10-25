ARG BASE_IMAGE
FROM ${BASE_IMAGE}
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV SDKMAN_DIR=/root/.sdkman
RUN bash -o pipefail -c 'mkdir -p /usr/local/share/hello-capture \
    && curl -fsSL "https://get.sdkman.io?ci=true&rcupdate=false" -o /tmp/sdkman-install.sh \
    && sha256sum /tmp/sdkman-install.sh > /usr/local/share/hello-capture/sdkman-installer.sha256 \
    && bash /tmp/sdkman-install.sh \
    && rm /tmp/sdkman-install.sh \
    && source /root/.sdkman/bin/sdkman-init.sh \
    && sdk version | tee /usr/local/share/hello-capture/sdkman-version.txt'
