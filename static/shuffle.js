'use strict';
var Shuffler = (function(){
    var shuffle= {
        x: 20,
        y: 20,
        time: 700,
        timeVariance: 0.8,
        globalShuffleStop: false
    };

    function getBoundedRand(min,max){
        if(min === max){ console.warn('[BoundedRand] your min was equal to your max');return min;}
        return min + (Math.random() * (max - min));
    }

    function getNextRandomMs(){
        let min = shuffle.time - (shuffle.time * shuffle.timeVariance);
        let max = shuffle.time + (shuffle.time * shuffle.timeVariance);
        return getBoundedRand(min,max);
    }

    function getAllShufflers(){
        let shufflers = document.getElementsByClassName("shuffler");
        //Imma put then in an array, because fuck the html collection crap
        let array = [];
        for(var i=0; i< shufflers.length; i++){
            array.push(shufflers[i]);
        }
        return array;
    }

    function shuffleAShuffler(shuffler){
        if(!shuffle.globalShuffleStop){
            shuffler.style.top = (Math.random()-0.5)*shuffle.y;
            shuffler.style.left = (Math.random()-0.5)*shuffle.x;
        }
    }

    /* //Global shuffling
    function shuffleTheShufflers(){
        var shufflers = document.getElementsByClassName("shuffler");
        getAllShufflers().forEach((shuffler)=>{
            shuffleAShuffler(shuffler);
        });
    }

    function timeoutFunc(){
        shuffleTheShufflers();
        //Keep going!
        setTimeout(timeoutFunc,getNextRandomMs());
    }

    //set off the initial one
    setTimeout(timeoutFunc,getNextRandomMs());

    /*/ //Attaching shufflerFunctions to each shuffler
    getAllShufflers().forEach((shuffler)=>{
        let timeoutFunc = ()=>{
            shuffleAShuffler(shuffler);
            //Keep going!
            setTimeout(timeoutFunc, getNextRandomMs());
        };
        //set off the initial one
        setTimeout(timeoutFunc,getNextRandomMs());
    });

    //*/
    console.log(`Everyday i'm shufflin'`);


    //----- THE PUBLIC STUFF -----//

    function toggleShuffling(){
        shuffle.globalShuffleStop = !shuffle.globalShuffleStop;
    }
    function setMaxShuffleDistance(dist){
        shuffle.x = dist;
        shuffle.y = dist;
    }
    function setTime(time, timeVariance){
        shuffle.time = time;
        if(typeof timeVariance !== 'undefined'){
            if(timeVariance >1 || timeVariance < 0){
                throw new RangeError(`Time variance must be in range 0=< x <=1. Got ${timeVariance}`);
            }
            shuffle.timeVariance = shuffle.timeVariance;
        }
    }
    //Return the config functions:
    return {
        toggleShuffling,
        setMaxShuffleDistance,
        setTime
    };

})();
