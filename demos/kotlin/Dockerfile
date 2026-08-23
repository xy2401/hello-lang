# syntax=docker/dockerfile:1
ARG TEMURIN_JDK_IMAGE
FROM ${TEMURIN_JDK_IMAGE}
ARG KOTLIN_VERSION=2.0.10
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl unzip \
 && curl -fsSL "https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip" -o /tmp/kotlin.zip \
 && unzip -q /tmp/kotlin.zip -d /opt \
 && rm -rf /var/lib/apt/lists/* /tmp/kotlin.zip
ENV PATH="/opt/kotlinc/bin:${PATH}"
