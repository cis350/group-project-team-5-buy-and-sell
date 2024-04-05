// This is a setting for preventing Vite's uncaughtReferenceError.
// It doesn't do anything other than that. - Jin
// Please refer to this post: https://stackoverflow.com/questions/72114775/vite-global-is-not-defined
window.global ||= window;
