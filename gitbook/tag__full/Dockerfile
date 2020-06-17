FROM node:12.16.1

RUN apt-get update
RUN apt-get install -y vim unzip

# basic gitbook commands
RUN npm install gitbook-cli -g
# note: do not install `gitbook` package by npm, or it will install gitbook@2.6.9 and cannot work
RUN gitbook --version # Trigger installing gitbook
RUN npm install gitbook-plugin -g

# for fixing unstable issue
COPY copyPluginAssets.js /root/.gitbook/versions/3.2.3/lib/output/website/

# support pdf (for `ebook-convert`)
RUN apt-get install -y calibre

# support Chinese, Japanese, Korean font when making pdf
ENV NOTO_FONT_ZIP NotoSansCJKtc-hinted.zip
RUN wget https://noto-website-2.storage.googleapis.com/pkgs/$NOTO_FONT_ZIP
RUN unzip $NOTO_FONT_ZIP
RUN mkdir -p /usr/share/fonts/noto/ ; \
    mv *.otf /usr/share/fonts/noto/ ; \
    fc-cache -f -v


COPY custom-entrypoint.sh /root/
RUN chmod +x /root/custom-entrypoint.sh

WORKDIR /gitbook
EXPOSE 4000

ENTRYPOINT ["sh", "/root/custom-entrypoint.sh"]
