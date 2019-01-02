At the height of the crypto-currency craze in 2017, I too dreamed of flying in lambos to the moon. Although a short lived dream, it gave me the chance to create a non-conventional web project, and experiment with multithreading on Node.js.

![Node.js Event Loop](/images/node-event-loop.png)
*Figure 1: Node.js Event Loop [1]*
{.img-event-loop}

Unlike most kernals, Node.js is runs on a single "non-blocking" thread. This architectural design makes Node's runtime environment very efficient for something like a web-server since new requests will simply be pushed to the top of the callback stack  - rather than spawning a new thread.  
  
>The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible [2].


Bittionaire had a number of goals that I wanted to accomplish, the first goal was to maintain a dataset of all historical prices  for a pre-defined set of coins. Some of the coins I tracked were Bitcoin (BTC), Monero (XMR), Ethereum (ETH), and Ripple (XRP), and these coins were selected due to their rising popularity at the time. 

Once I had a system of retrieving and storing daily historical prices, I then devised a number of trading indicators that I could apply to the historical prices. On-balance volume ([OBV](https://www.investopedia.com/terms/o/onbalancevolume.asp))    

## References

[1] https://medium.com/@amragaey/shortly-how-node-js-works-on-a-single-thread-763fda99f012
[2] https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
