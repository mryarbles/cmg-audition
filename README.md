# CMG Audition
I tried to make this solution flexible and extensible. I was inspired by various libraries that funnel arbitrary streams of data through a series of plugins that are responsible for transforming the data as needed. 

Our data, however, is not arbitrary. The data consists of a series of tagged tokens that are then followed by subsequent data that describes the token's state. We need to collect that information in relation to each token as we move along the stream, until the next token if found. 
Because of this, the pipeline has to do some management of active plugins and when their output is collected.  

One thing that I considered to simplify things was to run any calculations within any of the AccumulatorPlugins with each tick and update the current state of the output accordingly. I chose a slightly more complex route of waiting to grab these plugins output until the current plugins stream of data was complete for performance reason. The gains are probably pretty negligable though.

The other thing that could obviously improved is to load the data as a Stream and parse the chunks as they are loaded.

## Requirements
Node v15.5.1

## To run code
```
nvm install v15.5.1
nvm use
yarn install
yarn start
```
