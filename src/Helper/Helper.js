//converts timestamps to mm:ss format
export const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
};

export const customTimer = function(callback, delay) {
  let callbackStartTime;
  let remaining = 0;

  this.timerId = null;
  this.paused = false;
  this.seconds = 0;

  this.pause = () => {
    this.clear();
    remaining -= Date.now() - callbackStartTime;
    this.paused = true;
  };
  this.resume = () => {
    window.setTimeout(this.setTimeout.bind(this), remaining);
    this.paused = false;
  };
  this.setTimeout = () => {
    this.clear();
    this.timerId = window.setInterval(() => {
      callbackStartTime = Date.now();
      this.seconds++;
      callback(this.seconds);
    }, delay);
  };
  this.clear = () => {
    window.clearInterval(this.timerId);
  };

  this.setTimeout();
};

