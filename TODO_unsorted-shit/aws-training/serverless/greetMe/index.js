// an object of "Hello" in all common languages
const moment = require('moment')
const greeting = {
    en: 'Hello',
    es: 'Hola',
    fr: 'Bonjour',
    de: 'Hallo',
    it: 'Ciao',
    pt: 'Olá',
    ru: 'Привет',
    zh: '你好',
    ja: 'こんにちは',
    ko: '안녕하세요',
    ar: 'مرحبا',
    he: 'שלום',
    pl: 'Cześć',
    tr: 'Merhaba',
    th: 'สวัสดี',
    vi: 'Xin chào',
    id: 'Halo',
    ms: 'Selamat Datang',
    hi: 'नमस्ते',
    bn: 'হ্যালো',
    ta: 'வணக்கம்',
    te: 'హలో',
    ml: 'ഹലോ',
    gu: 'હેલો',
    or: 'ହେଲୋ',
    pa: 'ਹੈਲੋ',
    kn: 'ಹಲೆಯೆ',
    sa: 'नमस्ते',
    mr: 'नमस्ते',
    ur: 'ہیلو',
    am: 'ሰላም',
    bh: 'नमस्ते',
    dv: 'ަށިމަ',
    ne: 'नमस्कार',
    fa: 'سلام',
    ps: 'سلام',
    pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
    gu: 'હેલો',
    mr: 'नमस्ते',
    hi: 'नमस्ते',
    ta: 'வணக்கம்',
    te: 'హలో',
    ml: 'ഹലോ',
    or: 'ହେଲୋ',
    pa: 'ਹੈਲੋ'
}

exports.handler = async (event) => {
    const name = event.pathParameters.name;    
    let lang = 'en'
    let info = ''
    if(event.queryStringParameters?.lang) {
        // read lang from query parameter
        lang = event.queryStringParameters.lang || 'en';
        // info is event.queryParameters without lang property
        info = event.queryStringParameters;
        delete info.lang;        
    }
    
    let outputText = `${greeting[lang] ? greeting[lang] : greeting['en']} ${name}`;
    if (outputText) {
        return {
            statusCode: 200,
            // enable cors for https://www.test-cors.org/, https://www.cors-anywhere.herokuapp.com/ 
            headers: {
                'Access-Control-Allow-Origin': 'https://www.test-cors.org',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                message: outputText,
                info: info,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Bad Request'
            })
        }
    }
}