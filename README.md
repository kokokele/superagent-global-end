# superagent-global-end

Monitor global superagent beforeStart, end


## install
```
npm i superagent-global --save

```

## use
```
import {beforeStart, end} from 'superagent-global';

beforeStart(()=> {
    console.log('global_onBeforeStart');
});

beforeSend((Request) => {
    console.log('global_onBeforeEnd');
});


end((err, res) => {
    console.log('global:', res);

    // if return true, every end callback will execute. or not
    if(err) {
        return false;
    }
    return true;
});

```
