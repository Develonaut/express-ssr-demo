var __unsubscribe__ = function() {
  this.unsubscribeBtn = document.querySelector('[data-id="unsubscribe"]');
  this.unsubscribeMsg = document.querySelector('[data-id="message"]');
  this.subscribedMsg =
    "It appears you are subscribed to DailyAstroligie push notifications. Tapping the button below will unsubscribe with oneclick.";
  this.unsubscribedMsg =
    "We do not detect a subscription on your device. Please check the site settings to unsubscribe to push notifications.";
  this.attachListeners();
  this.updateButtonState(!!this.getCookie("token"));
};

__unsubscribe__.prototype.getCookie = function(name) {
  var v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

__unsubscribe__.prototype.unsubscribe = function() {
  Jalapeno.unsubscribe().then(
    function() {
      this.updateButtonState(false);
    }.bind(this)
  );
};

__unsubscribe__.prototype.attachListeners = function() {
  this.unsubscribeBtn.addEventListener("click", this.unsubscribe.bind(this));
};

__unsubscribe__.prototype.updateButtonState = function(enabled) {
  if (enabled) {
    this.unsubscribeBtn.disabled = false;
    this.unsubscribeBtn.innerHTML = "Click to Unsubscribe";
    this.unsubscribeMsg.innerHTML = this.subscribedMsg;
    return;
  }
  this.unsubscribeBtn.disabled = true;
  this.unsubscribeBtn.innerHTML = "No Subscription Detected";
  this.unsubscribeMsg.innerHTML = this.unsubscribedMsg;
};

document.addEventListener("DOMContentLoaded", () => {
  new __unsubscribe__();
});
