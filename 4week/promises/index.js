class BluebirdLikePromise extends Promise
{
    static map(iterable, mapper)
    {
        return new this((resolve, reject) => 
        {
            this.resolve(iterable).then(resolvedIterable =>
            {
                let result = [];
                let pending = 0;
                
                if ( typeof iterable[Symbol.iterator] !== 'function' && !(iterable === Object(iterable)) )
                {
                    reject(new TypeError(iterable + ' is not an iterable'));
                }
                for (let promise of resolvedIterable)
                {
                    pending++;
                    this.resolve(promise).then(resolvedPromise =>
                    {
                        this.resolve(mapper(resolvedPromise)).then(value =>
                        {
                            result.push(value);
                            if (!--pending)
                            {
                                resolve(result);
                            }
                        }, reject);
                    }, reject);
                }
            }, reject);
        });
    }

    static some(iterable, count)
    {
        return new this((resolve, reject) =>
        {
            this.resolve(iterable).then(resolvedIterable =>
            {
                if ( typeof iterable[Symbol.iterator] !== 'function' && !(iterable === Object(iterable)) )
                {
                    reject(new TypeError(iterable + ' is not an iterable'));
                }

                let resolved = [];
                let AggregateErrorDummy = [];
                for (let promise of resolvedIterable)
                {
                    this.resolve(promise).then(value =>
                    {
                        if (resolved.length < count) resolved.push(value);
                        if (resolved.length == count) resolve(resolved);
                    }, error =>
                    {
                        AggregateErrorDummy.push(error);
                        if (rejected.length == count) reject(AggregateErrorDummy);
                    });
                }
            }, reject);
        });
    }

    static reduce()
    {
      //still try to figure out
    }
}