#babel-test

Kicking the tires of Babel...

## Install
```
git clone https://github.com/thijsputman/babel-test
npm install
gulp
```

Then open up `index.html` via a webserver (e.g. `http-server`) and you'll be greeted with a "Hello World!" alert. Nothing grealty exciting; the experiment was mostly about putting together a proper toolchain and get it to run on the **Raspberry Pi 1** I had lying around.

## Installing/Running Node.js on Raspberry Pi 1
This actually turned out to be the most challenging part (and there I was expecting to type `apt-get install nodejs` and be done with it :smile:).

The version of Node.js offered through `apt-get` on Raspbian Jessie was rather out-dated, so I went searching a bit (with the aim of installing Node 4.3.0). The Raspberry Pi 1 contains an ARMv6-based CPU; most of the obvious stuff around online relies on/assumes you have an ARMv7-based CPU (e.g. the Raspberry Pi 2).  
[These instructions](http://weworkweplay.com/play/raspberry-pi-nodejs/), for example, lead me to install a somehow fundamentally broken version of Node on the Raspberry Pi (it worked, but was insanely slow and managed to break itself completely halfway through the build process).

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

Before continuing it's advisable to update NPM (version 3 is a great improvement), install Gulp (you'll need it later on anyway) and a simple HTTP server to test the "app":

```
sudo npm install -g npm
sudo npm install -g gulp
sudo npm install -g http-server
```

The Raspberry Pi is still significantly slower than my laptop (obviously), but doing a full build using Gulp takes a couple minutes, which is more than acceptable for what I had in mind.
