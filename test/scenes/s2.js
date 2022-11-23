let started = false;
export const API = {
    init: () => console.info("INIT SH2"),
    start: (prev) => {
        prev.stop();
        started = true;
        console.info("SH2 STARTED");
    },
    stop: () => {
        if (started) {
            started = false;
            console.info("SH2 STOPPED");
        }
    }
};