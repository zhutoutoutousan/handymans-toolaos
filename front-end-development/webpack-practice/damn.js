function perform(a,b, ops) {
    switch(ops) {
      case 'times':
  console.log(`calculated times ${a*b}`);
        return a * b;
      case 'minus':
        return a - b;
      case 'dividedBy':
        return Math.floor(a / b);
      case 'plus':
        return a + b;
    }
  }
  function zero() {
    let args = Array.prototype.slice.call(arguments)[0];
    if(args.length !== 0) {
      args = args[0];
      return perform(0, args[0], args[1]);
    }
    else return 0;
  }
  function one() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(1, args[0], args[1]);
    }
    else return 1;
  }
  function two() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(2, args[0], args[1]);
    }
    else return 2
  }
  function three() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(3, args[0], args[1]);
    }
    else return 3;
  }
  function four() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(4, args[0], args[1]);
    }
    else return 4;
  }
  function five() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(5, args[0], args[1]);
    }
    else return 5;
  }
  function six() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(6, args[0], args[1]);
    }
    else return 6;
  }
  function seven() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(7, args[0], args[1]);
    }
    else return 7;
  }
  function eight() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(8, args[0], args[1]);
    }
    else return 8;
  }
  function nine() {
    let args = Array.prototype.slice.call(arguments);
    if(args.length !== 0) {
      args = args[0];
      return perform(9, args[0], args[1]);
    }
    else return 9;
  }
  
  function plus() {
      let args = Array.prototype.slice.call(arguments);
      return [...args,'plus'];
  }
  function minus() {
      let args = Array.prototype.slice.call(arguments);
      return [...args,'minus'];
  }
  function times() {
      let args = Array.prototype.slice.call(arguments);
      return [...args,'times'];
  }
  function dividedBy() {
      let args = Array.prototype.slice.call(arguments);
      return [...args,'dividedBy'];
  }