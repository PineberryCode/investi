import type webgazerType from "webgazer";

declare global {
    interface Window {
        webgazer: typeof webgazerType;
    }
}