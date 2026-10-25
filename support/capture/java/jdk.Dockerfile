ARG SDKMAN_IMAGE
FROM ${SDKMAN_IMAGE}
ARG JDK_ID
ARG JDK_SHA256
ARG JDK_SOURCE
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
COPY install-jdk.sh /tmp/install-jdk.sh
RUN bash /tmp/install-jdk.sh && rm /tmp/install-jdk.sh
ENV JAVA_HOME=/root/.sdkman/candidates/java/current
ENV PATH="${JAVA_HOME}/bin:${PATH}"
