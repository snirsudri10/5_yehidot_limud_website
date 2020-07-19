function Dictonary()
{
    this.dataStore = [];

    this.add = function(key,value)
    {
        if(key&&value)
        {
            this.dataStore.push({
                key:key,
                value:value
            });
            return this.dataStore;
        }
        return "missing";
    };

    this.remove = function(key)
    {
        var i=0;
        for(i=0;i<this.dataStore.length;i++)
        {
            if(this.dataStore[i].key===key)
            {
                this.dataStore[i].slice(this.dataStore[i],1);
                return this.dataStore;
            }
        }
        return this.dataStore;
    };

    this.findAt = function(key)
    {
        for(var i=0;i<this.dataStore.length;i++)
        {
            if(this.dataStore[i].key === key)
            {
                return this.dataStore[i].value;
            }
        }
        return "not found";
    };

    this.size = function()
    {
        return this.dataStore.length;
    };

    this.clearDictonary = function()
    {
        while(this.dataStore.length > 0)
        {
            this.dataStore.pop();
        }
    }

    this.popLast = function()
    {
       this.dataStore.pop();
    }
}
