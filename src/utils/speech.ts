/**
 * Web Speech API text-to-speech for English tutor questions.
 * Prioritizes en-GB (UK English), falls back to en-US.
 * Reads blanks as "blank" without disclosing correct answers.
 */

let currentUtterance: SpeechSynthesisUtterance | null = null;
let speakingListeners: Array<(isSpeaking: boolean) => void> = [];

export function registerSpeakingListener(listener: (isSpeaking: boolean) => void) {
  speakingListeners.push(listener);
  return () => {
    speakingListeners = speakingListeners.filter((l) => l !== listener);
  };
}

function notifySpeaking(isSpeaking: boolean) {
  speakingListeners.forEach((l) => l(isSpeaking));
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  notifySpeaking(false);
  currentUtterance = null;
}

export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  utterance.rate = 0.8;
  utterance.pitch = 1.0;

  // Find best English voice (en-GB preferred, then en-US, then any en)
  const voices = window.speechSynthesis.getVoices();
  const ukVoice = voices.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
  const usVoice = voices.find((v) => v.lang === 'en-US' || v.lang.startsWith('en-US'));
  const anyEnVoice = voices.find((v) => v.lang.startsWith('en'));

  if (ukVoice) {
    utterance.voice = ukVoice;
    utterance.lang = 'en-GB';
  } else if (usVoice) {
    utterance.voice = usVoice;
    utterance.lang = 'en-US';
  } else if (anyEnVoice) {
    utterance.voice = anyEnVoice;
    utterance.lang = anyEnVoice.lang;
  } else {
    utterance.lang = 'en-US';
  }

  utterance.onstart = () => {
    notifySpeaking(true);
  };

  utterance.onend = () => {
    notifySpeaking(false);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    notifySpeaking(false);
    currentUtterance = null;
  };

  window.speechSynthesis.speak(utterance);
}
