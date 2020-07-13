'use strict'

const log = console.log;


const proc = Process.getModuleByName('macos_problem2');

// proc.enumerateSymbols().forEach((s) => {
//     log(JSON.stringify(s));
// });

const check_pass = new NativeFunction(proc.base.add(0x1830), 'bool', ['pointer']);

// var hardcoded_string = Memory.allocUtf8String('(qY&@ltUENc7oQ<{";9!2}kz-;E$I9|}');

// Interceptor.replace(proc.base.add(0x1830), new NativeCallback((input_pointer) => {
//     log("Executing original check_pass -> \n");
//     log(check_pass(hardcoded_string));
// }, 'bool', ['pointer']));

Interceptor.attach(proc.getExportByName('_ZNSt3__112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEC1ERKS5_'), {
    onEnter: (args) => {
        log('Entered basic_string()');
        log('First string -> ', ptr(args[0]).toString());
        log('Second string -> ', ptr(args[1]).toString());
        log(hexdump(ptr(args[0]), { offset: 0, length: 32, header: false, ansi: false }));
        log(hexdump(ptr(args[1]), { offset: 0, length: 32, header: false, ansi: false }));
    },
    onLeave: (ret) => {
        log('Exit from basic_string()');
    }
})

Interceptor.attach(proc.base.add(0x1830), {
    onEnter: (args) => {
        log('Input: ' + args[0].readCString());
    },
    onLeave: (ret) => {
        log('Exit from sub_100001A80');
        log('Ret Value: ' + ret.toInt32());
    }
})

Interceptor.attach(proc.base.add(0x1AD0), {
    onEnter: (args) => {
        log('Enter sub_100001AD0');
        log('param 1: ' + args[0]);
        log('param 2: ' + args[1]);
        log(hexdump(args[0].readPointer(), { offset: 0, length: 32, header: false, ansi: false }));
        // log(hexdump(args[1].readPointer(), { offset: 0, length: 32, header: false, ansi: false }));
    },
    onLeave: (ret) => {
        log('Leave sub_100001AD0');
    }
});

// const get_input = new NativeFunction(proc.base.add(0x1510), 'void', ['pointer', 'pointer']);

Interceptor.attach(proc.base.add(0x1510), {
    onEnter: (args) => {
        log('Entered sub_100001510');
        // log(args[1].readCString());
    },
    onLeave: (ret) => {
        log('Leave sub_100001510');
    }
});

Interceptor.attach(proc.base.add(0x1B00), {
    onEnter: (args) => {
        log('Enter sub_100001B00');
        log('param 1: ' + args[0].readCString());
        log('param 2: ' + args[1].toInt32());
    },
    onLeave: (ret) => {
        log('Leave sub_100001B00');
        log(ret.readCString());
    }
});


Interceptor.attach(proc.base.add(0x3C80), {
    onEnter: (args) => {
        log('Enter sub_100003C80');
        log('param 1: ' + args[0]);
    },
    onLeave: (ret) => {
        log('Leave sub_100003C80');
        log(ret.readCString());
    }
});
// const func = new NativeFunction(proc.base.add(0x1830), 'bool', ['pointer']);
// Interceptor.replace(proc.base.add(0x1830), new NativeCallback((string_pointer) => {

// }, 'bool', ['pointer']));