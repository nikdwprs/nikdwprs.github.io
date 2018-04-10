

import { IframeMessager } from './messager';
import 'babel-polyfill';


const { iframeResizer } = require('iframe-resizer');
declare var PROD : boolean;

{
	console.log(PROD)
	const url = `https://strahovki24${PROD ?'-dev.dwpr' : ''}.ru/iframe-integration/realty/insurance`;
	const strahovki24Iframe = document.createElement('iframe');
	const iframeMessager = new IframeMessager('strahovki-24-iframe');
	const container = document.getElementById('strahovki-24-iframe');
	container.style.maxWidth = '576px';
	container.style.margin = '0 auto';
	strahovki24Iframe.src = url;
	strahovki24Iframe.scrolling = 'no';
	strahovki24Iframe.name = 'strahovki-24-iframe';
	strahovki24Iframe.style.width = '100%';
	strahovki24Iframe.style.border = 'none';

	/**
	 * @desc добавляем прелоадер
	 */

	const strahovki24Preloader = document.createElement('div');
	const strahovki24PreloaderImage = document.createElement('img');

	strahovki24Preloader.style.position = 'fixed';
	strahovki24Preloader.style.top = '50%';
	strahovki24Preloader.style.left = '50%';
	strahovki24Preloader.style.transform = 'translate(-50%, -50%)';
	strahovki24Preloader.style.display = 'flex';
	strahovki24Preloader.style.alignItems = 'center';
	strahovki24Preloader.style.justifyContent = 'center';
	strahovki24Preloader.style.background = '#fff';

	strahovki24PreloaderImage.style.width = '50px';
	strahovki24PreloaderImage.style.maxWidth = '100%';
	strahovki24PreloaderImage.style.height = '50px';
	strahovki24PreloaderImage.setAttribute('src', 'https://strahovki24.ru/img/preloader.gif');

	strahovki24Preloader.appendChild(strahovki24PreloaderImage);
	
	 /**
	  * конец инициализации прелоадера.
	  */
	
	container.appendChild(strahovki24Preloader);
	container.appendChild(strahovki24Iframe);

	iframeMessager.on('STRAHOVKI_24_LOADED', (payload) => {
		container.removeChild(strahovki24Preloader);

		iframeResizer({
			sizeHeight: true,
			sizeWidth: false,
			warningTimeout: 15000,
			bodyBackground: '#fff'
			
		}, strahovki24Iframe);
		iframeMessager.send('STRAHOVKI_24_RESIZE', { width: innerWidth });
		iframeMessager.send('STRAHOVKI_24_INIT', {
			url: window.location.href
		});
		window.addEventListener('resize', (event) => iframeMessager.send('STRAHOVKI_24_RESIZE', { width: innerWidth }) );
	});
	iframeMessager.on('STRAHOVKI_24_REDIRECT', (event) => { 
		window.location.replace(event.payload.url);
	});
	iframeMessager.on('STRAHOVKI_24_LOCAL_REDIRECT', (event) => {
		window.location.replace(event.payload.url);
	});
	iframeMessager.on('STRAHOVKI_24_SCROLL_TO', (event) => {
		window.scrollTo(window.scrollX, event.top);
	});
}
