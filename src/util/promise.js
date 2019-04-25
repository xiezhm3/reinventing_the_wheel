/**
    1.只有一个then方法，没有catch，race，all等方法，甚至没有构造函数;
    2.Promise标准中仅指定了Promise对象的then方法的行为，其它一切我们常见的方法/函数都并没有指定，包括catch，race，all等常用方法，甚至也没有指定该如何构造出一个Promise对象，
      另外then也没有一般实现中（Q, $q等）所支持的第三个参数，一般称onProgress;
    3.then方法返回一个新的Promise;
    4.Promise的then方法返回一个新的Promise，而不是返回this;
        promise2 = promise1.then(alert)
        promise2 != promise1 // true
    5.不同Promise的实现需要可以相互调用(interoperable);
    6.Promise的初始状态为pending，它可以由此状态转换为fulfilled（本文为了一致把此状态叫做resolved）或者rejected，一旦状态确定，就不可以再次转换为其它状态，状态确定的过程称为settle.
 **/
function Promise_(executor) {
    const self = this;
    this.data = '';
    this.status = 'pending';
    const onResolvedCallback = [];
    const onRejectedCallback = [];

    function resolve(value) {
        // todo
        if (self.data !== 'pending') {
            return;
        }
        self.status = 'resolved';
        self.data = value;

        for (var i = 0; i < self.onResolvedCallback.length; i++) {
            self.onResolvedCallback[i].call(self, value);
        }

    }

    function reject(reason) {
        // todo
        if (self.status !== 'pending') {
            return;
        }
        self.status = 'rejected';
        self.data = reason;

        for (var i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i].call(self, reason);
        }
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise_.prototype.then = function (onResolved, onRejected) {
    // todo return new promise
    let newPromise;
    const self = this;
    onResolve = typeof onResolved === 'function' ? onResolved : function (v) {
        return v;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) {
        throw r;
    };

    if (this.status === 'pending') {
        newPromise = new Promise_((resolve, reject) => {
            this.onResolvedCallback.push((value) => {
                try {
                    const result = onResolved(this.data);
                    if (result instanceof Promise_) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            });
            this.onRejectedCallback.push((reason) => {
                try {
                    const result = onRejected(this.data);
                    if (result instanceof Promise_) {
                        result.then(resolve, reject);
                    } else {
                        reject(result);
                    }
                } catch (error) {
                    reject(error);
                }
            });

        });
    } else if (this.status === 'resolved') {
        newPromise = new Promise_((resolve, reject) => {
            try {
                const result = onResolved(this.data);
                if (result instanceof Promise_) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    } else if (this.status === 'rejected') {
        newPromise = new Promise_((resolve, reject) => {
            try {
                const result = onRejected(this.data);
                if (result instanceof Promise_) {
                    result.then(resolve, reject);
                } else {
                    reject(result);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    return newPromise;
};

Promise_.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

module.export = Promise_;