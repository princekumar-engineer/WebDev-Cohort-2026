const stream = {
  count: 0,

  // NOTE: This is the Iterator protocol's core method. It must return a Promise 
  // that resolves to an object with { value, done }. Making it an 'async' function 
  // automatically wraps the returned object in a Promise.
  async next() {
    this.count++;
    
    // NOTE: Signaling the end of the stream. When 'done' is true, 
    // the 'for await...of' loop knows it's time to break and stop iterating.
    if (this.count > 5) {
      return { done: true };
    }
    
    return {
      done: false,
      value: `Chunk ${this.count}`,
    };
  },

  // NOTE: This well-known Symbol tells JavaScript that this object is 
  // officially an Async Iterable. It acts as a gateway; when 'for await...of' 
  // encounters this object, it looks for this Symbol and expects it to return an iterator (this).
  [Symbol.asyncIterator]() {
    return this;
  },
};

// NOTE: The 'for await...of' statement creates a loop iterating over async iterable objects.
// With every iteration, it implicitly awaits the promise returned by stream.next() 
// before executing the code inside the loop body.
for await (const chunk of stream) {
  console.log(chunk);
}