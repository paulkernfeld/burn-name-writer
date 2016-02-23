BurnName Writer
===============
BurnName writer lets you write to [BurnName](https://gist.github.com/paulkernfeld/c1411466c53d4bc17f8c). For a reader, see [burn-name](https://github.com/paulkernfeld/burn-name).

There are two stages to writing: *bidding* for a name and attaching *data* to an address.

Bidding
-------
You must always pass in `-t` to indicate that you're using testnet Bitcoins.

To bid for a name:

```
node bin/write.js -t \
    --name occupy-paul-st \
    --amount 10000
    --address mhoMaeKgMjYvxphsj4RcmgKZHP25VqByNN
    --changeAddress mhoMaeKgMjYvxphsj4RcmgKZHP25VqByNN
```

* `name` is the name that you're bidding for.
* `amount` is the quantity, in Satoshis, that you're bidding for the name.
* `address` is the Bitcoin address that will own this name. This address must have a balance greater than `amount`.
* `changeAddress ` is the address to which change will be sent. Usually, you'll want to just send change to the owner address.

Attaching data
--------------
To attach data to a name:

```
node bin/write.js -t \
    --data hello
    --address mhoMaeKgMjYvxphsj4RcmgKZHP25VqByNN
    --changeAddress mhoMaeKgMjYvxphsj4RcmgKZHP25VqByNN
```

* `data` is the data you're attaching to this address.
* `address` is a Bitcoin address, presumably one that owns a name or will in the future own a name. This address must have a balance greater than `amount`.
* `changeAddress` is the address to which change will be sent. Usually, you'll want to just send change to the owner address.
