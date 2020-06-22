let log = console.log;

let base = Module.getBaseAddress('LOL');

let offset = 0x000209E7;

Interceptor.attach(base.add(offset), {
	onEnter: (args) => {
		log(args[0]);
		log(args[1]);
	},
	onLeave: (retval) => {
		log(retval.readLong());
	}
});
