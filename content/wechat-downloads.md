
When it comes to mobile messaging in China, WeChat is second to none. There is hardly a mobile phone owner in China that
does not have a installation of WeChat.

<br />

> WeChat (微信) is a Chinese multi-purpose messaging, social media and mobile payment app developed by Tencent. First released in 2011, it became the world's largest standalone mobile app in 2018, with over 1 billion monthly active users. WeChat has been described as China's "app for everything" and a "super app" because of its wide range of functions. WeChat provides text messaging, hold-to-talk voice messaging, broadcast (one-to-many) messaging, video conferencing, video games, sharing of photographs and videos, and location sharing. [1]

<br />

Despite the mobile app's popularity and wide-variety of features, there was one "feature" of the desktop app that I was
not a fan of. The macOS version of WeChat automatically deletes any chatroom files after a certain amount of days
without warning, and there is no way to recover the files once it happens. The only way to prevent this is if the user
manually saves the file to one of the user's directories. There is little repercussion for a casual user like myself to
not save all his files, however this is not the case for business users that heavily relies on WeChat.

<br />

## Functionality

WeChat Downloads runs in the background as a menubar app ([py2app](https://github.com/ronaldoussoren/py2app)) and
utilizes [Watchdog](https://github.com/gorakhargosh/watchdog) to watch WeChat's tmp directories to watch for any new
files. These files are then automatically saved to a pre-configured user directory, and will be accessible until the
user deletes them.


<p class="p-4 sm:p-8 md:p-12">
<img src="/images/wechat-downloads-screenshot.png" alt="WeChat Downloads in use" class="shadow-3xl" />
</p>

## Development

My initial architecture made use of [tkinter](https://docs.python.org/3/library/tkinter.html) as the GUI and a 
multi-threaded watcher for file system changes. This attempt was thwarted by none other than the [Python Global Interpreter Lock (GIL)](https://wiki.python.org/moin/GlobalInterpreterLock). Unlike most multi-threading designs that allows concurrent access to a shared memory space: 
<br/><br/>

> Python's GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once. The GIL prevents race conditions and ensures thread safety. A nice explanation of how the GIL helps in these areas can be found here. In short, this mutex is necessary mainly because CPython's memory management is not thread-safe [2].

<br/>
Additionally, the GIL even affects threads that live in different processes. One way to circumvent this "design feature" is to use multi-processing in lieu of multi-threading. 
However, I opted to use third-party packages, py2app and Watchdog, as a means to not reinvent the wheel.

<hr class="my-4"/>

### References

[1] https://en.wikipedia.org/wiki/WeChat <br>
[2] https://wiki.python.org/moin/GlobalInterpreterLock
