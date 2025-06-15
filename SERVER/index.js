// index.js
import { server } from "./src/config/soket.js";
import { color } from "04-utils";
server.listen(3000, () => {
    color(["\n🚀 Server Status: Running", "brightGreen", "bold"]);
    color(
        ["🌍 Access it at: ", "cyan", "bold"],
        [`http://localhost:${process.env.PORT}`, "brightCyan", "underline"]
    );
    color(["⚡ Press Ctrl+C to stop the server", "yellow", "bold"]);
    color(["════════════════════════════════════", "brightMagenta", "bold"]);
});
