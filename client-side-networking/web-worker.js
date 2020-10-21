self.addEventListener('message', (ev) => {
    console.log('Web worker started with data: ', ev.data);
    let data = ev.data;
    switch(data) {
        case 'Get Started':
            self.postMessage('Web Worker Started');
            break;
        case 'Other':
            self.postMessage('Other task...');
            break;
        case 'Data':
            let url = 'https://jsonplaceholder.typicode.com/posts';

            break;
        default: 
            console.log(data);
            console.log('Invalid access');
            self.postMessage('Closing Web Worker');
            self.close();

    }
})