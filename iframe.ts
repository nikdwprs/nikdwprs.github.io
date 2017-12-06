
import { IframeMessager } from './messager';
const { iframeResizer } = require('iframe-resizer');


{
	const url = 'https://strahovki24.dwpr.ru/iframe-integration/travel/insurance';
	const strahovki24Iframe = document.createElement('iframe');
	const iframeMessager = new IframeMessager('strahovki-24-iframe');
	const container = document.getElementById('strahovki-24-iframe');
	strahovki24Iframe.src = url;
	strahovki24Iframe.scrolling = 'no';
	strahovki24Iframe.name = 'strahovki-24-iframe';

	container.appendChild(strahovki24Iframe);

	iframeMessager.on('STRAHOVKI_24_LOADED', (payload) => {
		iframeResizer({
			sizeHeight: true,
			sizeWidth: true,
			warningTimeout: 15000
		}, strahovki24Iframe);
		iframeMessager.send('RESIZE', { width: innerWidth });
		iframeMessager.send('INIT', {
			url: window.location.href
		});
		window.addEventListener('resize', (event) => iframeMessager.send('RESIZE', { width: innerWidth }) );
	});
	iframeMessager.on('STRAHOVKI_REDIRECT', (payload) => { 
		console.log(payload);
		// window.location.replace(payload.url)
	});

}
