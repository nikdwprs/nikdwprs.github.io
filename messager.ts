






export class IframeMessager {

	/**
	 * Creates an instance of IframeMessager.
	 * @param {string} [name='strahovki-24-iframe'] 
	 * @memberof IframeMessager
	 */
	constructor(public name = 'strahovki-24-iframe') {
		window.addEventListener('message', this.listen);
	}

	/**
	 * 
	 * @memberof IframeMessager
	 */
	public listeners = [];

	/**	
	 * 
	 * @readonly
	 * @memberof IframeMessager
	 */
	public get frame() : Window {
		if (this.name)  return window.frames[this.name];
		return window.frames;
	}

	
	/**
	 * 
	 * @param {string} type 
	 * @param {*} [payload={}] 
	 * @memberof IframeMessager
	 */
	public send(type : string, payload : any = {}) {
		this.frame.postMessage({ type, payload }, '*');
	}


	/**
	 * 
	 * @memberof IframeMessager
	 */
	private listen = (event) => {
		if (typeof event.data == 'object') {
			console.log(this.listeners)
			const listener = this.listeners.find(listener => listener.type == event.data.type);
			if (listener) listener.handle(event.data);
		}
	}
	
	/**
	 * 
	 * 
	 * @memberof IframeMessager
	 */
	public on = (type : string = '', handle = (payload) => {}) => {
		this.listeners.push({
			type,
			handle
		});
	}

}