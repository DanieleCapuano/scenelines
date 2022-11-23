let started = false;
export const API = {
    init: () => console.info("INIT SH1"),
    start: (prev) => {
        prev.stop();
        started = true;
        console.info("SH1 STARTED");
    },
    stop: () => {
        if (started) {
            started = false;
            console.info("SH1 STOPPED");
        }
    }
};