const log = console.log;

Process.enumerateModules().forEach((m) => {
  log(JSON.stringify(m));
});