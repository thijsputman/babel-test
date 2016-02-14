#babel-test

Kicking the tires of Babel... **Or:** A good excuse to learn a bit more about Node, NPM, Gulp and how to put it all together in modern-day Linux.

## Install
```
git clone https://github.com/thijsputman/babel-test
npm install
gulp
```

Now open up `index.html` (via a *webserver*, otherwise it will not work) and you'll be greeted with a "Hello World!"-alert. Nothing grealty exciting; the experiment was mostly about putting together a proper toolchain and get it to run on the **Raspberry Pi 1** I had lying around.

### Run it using [`http-server`](https://www.npmjs.com/package/http-server)
Included in the `extra`-folder are the basic requirements to get babel-test up-and-running as a service using `http-server` on a Raspberry Pi (i.e. Debian, but it should work for most distros I guess).

1. Install http-server: `sudo npm install -g http-server`
2. Ensure the `start`-script is executable: `chmod +x extra/start`
3. Install babel-test as "unit" (service?) in systemd:

```
sudo ln ~/babel-test/extra/babel-test.service /etc/systemd/system/babel-test.service
sudo systemctl daemon-reload
sudo systemctl enable babel-test
sudo systemctl start babel-test
```

This \*should\* automatically start the `babel-test`-service upon system boot (running as the "pi" user, which is probably not something you want unless you, like me, are just toying around a bit).

## Installing/Running Node.js on Raspberry Pi 1 (Raspbian)
This actually turned out to be the most challenging part (and there I was expecting to type `apt-get install nodejs` and be done with it :smile:).

The version of Node.js offered through `apt-get` on Raspbian Jessie was rather out-dated, so I went searching a bit (with the aim of installing Node 4.3.0). The Raspberry Pi 1 contains an ARMv6-based CPU; most of the obvious stuff around online relies on/assumes you have an ARMv7-based CPU (e.g. the Raspberry Pi 2).  
<s>[These instructions](http://weworkweplay.com/play/raspberry-pi-nodejs/), for example, lead me to install a somehow fundamentally broken version of Node on the Raspberry Pi (it worked, but was insanely slow and managed to break itself completely halfway through the build process).</s> It appears the memory-card I was using didn't really like the Raspberry Pi (or the other way around); this might have caused the unexpected breakage, I doubt it had anything to do with the speed issue.

Finally, the below (courtesy of [Wia](http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi/)) turned out to work very well. You can easily change the version-number in the file should you want an older/newer version of Node (although I did not actually try running any version other than 4.3.0).

```
wget https://nodejs.org/dist/v4.3.0/node-v4.3.0-linux-armv6l.tar.gz
tar -xvf node-v4.3.0-linux-armv6l.tar.gz
cd node-v4.3.0-linux-armv6l

sudo cp -R * /usr/local/

cd ..
rm -r node-v4.3.0-linux-armv6l
rm node-v4.3.0-linux-armv6l.tar.gz
```

I think (formally speaking) you should put this in `/opt` and not in `/usr/local`, but after the amount of time I just spend trying to figure something out which *literally* took me five minutes on Windows (which is absolutely not a fair comparison, I know, but still :smile:) I'm settling for "if it ain't broke, don't fix it"...

Before continuing it's advisable to update NPM (version 3 is a great improvement) and to install Gulp (you'll need it later on anyway):

```
sudo npm install -g npm
sudo npm install -g gulp
```

The Raspberry Pi is still significantly slower than my laptop (obviously), but doing a full build using Gulp takes a couple minutes, which is more than acceptable for what I had in mind.
