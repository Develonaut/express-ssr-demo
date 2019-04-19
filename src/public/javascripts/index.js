var __onBoarding__ = function() {
  this.track("notify_pageview", { url: "index" });
  this.attachListeners();
  this.showAdx();
  this.blogUrl =
    "//blog.dailyastrologie.com/horoscope?subid=1-default-int_horoscope-myhoroscope";
  this.thankYouUrl = "thankyou.html";
};

__onBoarding__.prototype.showAdx = function() {
  var adx = document.querySelector('[data-id="adx_unit"]');
  if (this.getPermission() !== "default") adx.classList.remove("hidden");
};

__onBoarding__.prototype.getPermission = function() {
  var { permission = "default" } = window.Notification;
  return permission;
};

__onBoarding__.prototype.attachListeners = function() {
  var promptBtns = document.querySelectorAll('[data-id="horoscope_button"]');
  for (var i = 0; i < promptBtns.length; i++) {
    promptBtns[i].addEventListener("click", this.onClick.bind(this));
  }
};

__onBoarding__.prototype.track = function(eventName, params) {
  Jalapeno.analytics.track(eventName, params);
};

__onBoarding__.prototype.onClick = function() {
  if (this.getPermission() === "granted") return this.goTo(this.blogUrl);
  this.attachJalapenoListeners();
  Jalapeno.prompt.requestPermission();
};

__onBoarding__.prototype.attachJalapenoListeners = function() {
  Jalapeno.prompt.on("prompt:notification:pref:denied", () =>
    this.goTo(this.thankYouUrl)
  );

  Jalapeno.tokenRegistrar.on("token:subscribing", () => {
    document.querySelector('[data-id="loading"]').classList.remove("hidden");
  });

  Jalapeno.tokenRegistrar.on("token:subscribed", () => {
    if (this.getPermission() !== "granted") return this.goTo(this.blogUrl);
    Jalapeno.notificationCourier.on("notification:received", () =>
      this.goTo(this.thankYouUrl)
    );
    this.fireNotitification();
  });
};

__onBoarding__.prototype.fireNotitification = function() {
  Jalapeno.notificationCourier.send({
    data: {
      notificationTitle: "Your Daily Horoscope Is Waiting For You!",
      title: "Your Daily Horoscope Is Waiting For You!",
      body: "See what your future holds!",
      icon: "//dc64ok5sq27mx.cloudfront.net/6/14/2018_horoscope.icon.final.jpg",
      image:
        "//dc64ok5sq27mx.cloudfront.net/6/14/2018_horoscope.icon.final.jpg",
      url:
        "//blog.dailyastrologie.com/horoscope?subid=1-default-int_horoscope-myhoroscope",
      topic: "Welcome",
      uniqueID: new Date().toISOString(),
      pushID: "-10",
      pushcontent: "base",
      token: "default"
    }
  });
};

__onBoarding__.prototype.goTo = function(url) {
  window.location.href = url;
};

document.addEventListener("DOMContentLoaded", () => {
  new __onBoarding__();
});
