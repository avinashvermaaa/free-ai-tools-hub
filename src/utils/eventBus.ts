export function triggerToast(text: string) {
  const event = new CustomEvent("app-toast", { detail: text });
  window.dispatchEvent(event);
}
