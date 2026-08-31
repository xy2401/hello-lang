ARG GCC_IMAGE=gcc:14
ARG DEBIAN_IMAGE=debian:bookworm-slim
FROM ${GCC_IMAGE} AS builder
ARG LUA_VERSION=5.5.1
ARG LUA_SHA256=1c4b4068d67061f2a2231ad2b5422e77acea1487ea9890f6320af614f4373dce
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*
RUN curl -fsSLo /tmp/lua.tar.gz "https://www.lua.org/ftp/lua-${LUA_VERSION}.tar.gz" && echo "${LUA_SHA256}  /tmp/lua.tar.gz" | sha256sum -c - && mkdir /tmp/lua && tar -xzf /tmp/lua.tar.gz -C /tmp/lua --strip-components=1 && make -C /tmp/lua -j2 && make -C /tmp/lua INSTALL_TOP=/opt/lua install

FROM ${DEBIAN_IMAGE}
COPY --from=builder /opt/lua /opt/lua
ENV PATH="/opt/lua/bin:${PATH}"
CMD ["lua", "-v"]
