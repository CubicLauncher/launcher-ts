import { NeutronLauncher } from "cubic-neutron";

const launcher = new NeutronLauncher()

let a= await launcher.launchVersion({
    username: "rosca",
    uuid: "123",
    accessToken: "123",
    minecraftDir: "C:/Users/Santi/AppData/Local/cubic/Data/.minecraft",
    version: "1.8.9",
    isCracked: true,
    javaPath: "C:/Program Files/Java/jre1.8.0_451/bin/javaw.exe",
})
a.stdout.on('data', (data) => {
  console.log(`STDOUT: ${data}`);
});

a.stderr.on('data', (data) => {
  console.error(`STDERR: ${data}`);
});