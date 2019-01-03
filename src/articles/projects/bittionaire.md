At the height of the crypto-currency craze in 2017, I too dreamed of flying in lambos to the moon. Although a short lived dream, it gave me the chance to create a non-conventional web project, and experiment with multithreading on Node.js.

![Node.js Event Loop](/images/node-event-loop.png)*Figure 1: Node.js Event Loop [1]*
{.img-md}

Unlike most kernals, Node.js is runs on a single "non-blocking" thread. This architectural design makes Node's runtime environment very efficient for something like a web-server since new requests will simply be pushed to the top of the callback stack  - rather than spawning a new thread.  
  
>The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible [2].

***{.hr-star}

I had a number of goals that I wanted to accomplish with Bittionaire. The first goal was to maintain a dataset of all historical prices  for a pre-defined set of coins. Some of the coins I tracked were Bitcoin (BTC), Monero (XMR), Ethereum (ETH), and Ripple (XRP); and these coins were selected due to their rising popularity at the time. 

Once I had a system of retrieving and storing daily historical prices, it was now time to develop a simulator. Prior to ever writing a single line of code, I was a Business Student back in New York. During this time I dipped my toes in forex currency trading, and had recalled reading a guide called [The Turtle Trading Rules](http://www.metastocktools.com/downloads/turtlerules.pdf). Without diving too deep into the subject, the guide is a set of rules dictating when a trader should enter a trade, when to exit one. Ultimately, I coded two trading strategies - On-Balance Volume [On-Balance Volume](https://www.investopedia.com/terms/o/onbalancevolume.asp), and [Donchian Channels](https://www.investopedia.com/terms/d/donchianchannels.asp) in JavaScript, and used these in conjunction with data on a coin's trading volume and relative dominance.

 ![Bittionaire Bitcoin Table](/images/bittionaire.png)*Figure 2: Bittionaire Bitcoin Table*
{.img-md}

***{.hr-star}

Additionally, I also ported some of the computational logic into a Desktop [Electron.js](https://electronjs.org) project, and applied time in addition to a number of other indicators ([Moving-Averages](https://www.investopedia.com/terms/m/movingaverage.asp) & [RSI](https://www.investopedia.com/terms/r/rsi.asp)). This project distinguished itself from the original project because it was tracked the prices in real-time using [WebSockets](https://en.wikipedia.org/wiki/WebSocket). 
 
 ![Bittionaire Electron Coins Table](/images/bittionaire-electron.png)*Figure 2: Bittionaire Electron Coins Table*
 {.img-md}
 
 ***{.hr-star}
 
 Check out the projects for yourself on Gitlab:
 [Bittionaire Web](https://gitlab.com/jinusean/bittionaire)
 [Bittionaire Desktop](https://gitlab.com/jinusean/bittionaire-electron)

## References{.project__footer}

[1] https://medium.com/@amragaey/shortly-how-node-js-works-on-a-single-thread-763fda99f012
[2] https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
