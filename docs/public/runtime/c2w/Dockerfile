FROM alpine:3.23

ARG LANGUAGE
ARG KOTLIN_VERSION=2.3.20
ENV HELLO_LANG_RUNTIME=${LANGUAGE} \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PATH=/opt/kotlinc/bin:${PATH}

RUN apk add --no-cache \
      bash ca-certificates coreutils file findutils gawk git grep jq less nano sed tree \
    && case "${LANGUAGE}" in \
      java) apk add --no-cache openjdk25-jdk ;; \
      javascript) apk add --no-cache nodejs npm ;; \
      typescript) apk add --no-cache nodejs npm typescript ;; \
      python) apk add --no-cache python3 py3-pip ;; \
      cpp) apk add --no-cache build-base clang cmake ;; \
      go) apk add --no-cache go ;; \
      rust) apk add --no-cache cargo rust ;; \
      kotlin) \
        apk add --no-cache curl openjdk25-jdk unzip \
        && curl -fsSL "https://github.com/JetBrains/kotlin/releases/download/v${KOTLIN_VERSION}/kotlin-compiler-${KOTLIN_VERSION}.zip" -o /tmp/kotlin.zip \
        && unzip -q /tmp/kotlin.zip -d /opt \
        && rm /tmp/kotlin.zip ;; \
      php) apk add --no-cache php85 && ln -sf /usr/bin/php85 /usr/local/bin/php ;; \
      ruby) apk add --no-cache ruby ruby-bundler ;; \
      html) apk add --no-cache nodejs npm && npm install --global html-validate@10.17.0 ;; \
      css) apk add --no-cache nodejs npm && npm install --global stylelint@17.14.1 ;; \
      *) echo "Unsupported LANGUAGE=${LANGUAGE}" >&2; exit 64 ;; \
    esac \
    && printf '%s\n' \
      '#!/bin/sh' \
      'case "$HELLO_LANG_RUNTIME" in' \
      '  java) java --version 2>&1 | head -n 1 ;;' \
      '  javascript) node --version ;;' \
      '  typescript) printf "Node %s · TypeScript %s\\n" "$(node --version)" "$(tsc --version)" ;;' \
      '  python) python3 --version ;;' \
      '  cpp) gcc --version | head -n 1 ;;' \
      '  go) go version ;;' \
      '  rust) rustc --version ;;' \
      '  kotlin) kotlinc -version 2>&1 ;;' \
      '  php) php --version | head -n 1 ;;' \
      '  ruby) ruby --version ;;' \
      '  html) printf "Node %s · html-validate %s\\n" "$(node --version)" "$(html-validate --version)" ;;' \
      '  css) printf "Node %s · Stylelint %s\\n" "$(node --version)" "$(stylelint --version)" ;;' \
      'esac' > /usr/local/bin/hello-lang-version \
    && chmod +x /usr/local/bin/hello-lang-version \
    && printf '%s\n' \
      'export PS1="lang-rv64:\\w$ "' \
      'cd /workspace' > /etc/profile.d/hello-lang.sh \
    && mkdir -p /workspace

WORKDIR /workspace
CMD ["/bin/bash", "-l"]
