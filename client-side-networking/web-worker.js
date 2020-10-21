self.addEventListener('message', (ev) => {
    console.log('Web worker started with data: ', ev.data);
    let data = ev.data;
console.log(data);
    switch(data) {
//         case 'Get Started':
// console.log(self);
//             self.postMessage('Web Worker Started');
//             break;
//         case 'Other':
//             self.postMessage('Other task...');
//             break;
        case 'fetch':
            let url = 'https://jsonplaceholder.typicode.com/posts';
            fetch(url)
                .then(res => res.json())
                .then( data => {
                    self.postMessage( data ); 
                })
                .catch(err => console.log(err));
            break;
        default: 
            console.log(data);
            console.log('Invalid access');
            self.postMessage('Closing Web Worker');
            self.close();

    }
})