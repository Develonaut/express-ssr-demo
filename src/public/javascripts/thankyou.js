var { permission = "default" } = window.Notification;

var __thankYou__ = function() {
  this.grantedOffers = [
    {
      url: "//go.telsyne.com/ts5192-push-psychic-us?thru=typ&pushid=10875",
      image: "./images/esmeralda.png",
      offerName: "hastraffic",
      offerId: 0
    },
    {
      url: "//go.whatifoffers.com/3R78B3N/6KWS5L/?sub1=TYP",
      image: "./images/astrologieguide.gif",
      offerName: "whatif-cpc",
      offerId: 0
    },
    {
      url: "//go.whatifoffers.com/3R78B3N/6H52ND/?sub1=TYP",
      image: "./images/esmeralda.png",
      offerName: "whatif-cpa",
      offerId: 0
    }
  ];

  this.deniedOffers = [
    {
      url:
        "//c.stkstrck.com/?TTT=geIZexQmz5wODKnQQzOoaJGZqlSF1S3hlgDJwpjxrOw%3d-xqhoAzlR4qA%3d&s1=11452",
      image: "./images/firefly.png",
      offerName: "firefly-love",
      offerId: 0
    },
    {
      url:
        "//c.stkstrck.com/?TTT=geIZexQmz5wODKnQQzOoaJGZqlSF1S3hlgDJwpjxrOw%3d-xqhoAzlR4qA%3d&s1=11452",
      image: "./images/lovehoroscope.png",
      offerName: "firefly-old",
      offerId: 0
    }
  ];

  this.offer = this.getOffer();
  this.offerEl = document.querySelector('[data-id="offer"]');
  this.offerImageEl = document.querySelector('[data-id="offer_image"]');

  this.track("notify_pageview", {
    url: permission === "denied" ? "block" : "thankyou"
  });

  this.initOffer();
  this.attachListeners();
};

__thankYou__.prototype.getPermission = function() {
  var { permission = "default" } = window.Notification;
  return permission;
};

__thankYou__.prototype.attachListeners = function() {
  this.offerEl.addEventListener("click", () =>
    this.trackClick(this.offer.offerName, this.offer.offerId)
  );
};

__thankYou__.prototype.track = function(eventName, params) {
  var { track } = window.Jalapeno.analytics;
  track(eventName, params);
};

__thankYou__.prototype.initOffer = function() {
  this.offerEl.href = this.offer.url;
  this.offerImageEl.src = this.offer.image;
};

__thankYou__.prototype.getOffer = function() {
  var getItem = items => items[Math.floor(Math.random() * items.length)];
  return getItem(
    this.getPermission() !== "denied"
      ? this.grantedOffers
      : this.deniedOffers[Math.ceil(Math.random() * 3)]
  );
};

__thankYou__.prototype.trackClick = function(offerName, offerId) {
  this.track("lp_ad_click", {
    subid7: this.getPermission() === "denied" ? "block" : "thankyou",
    subid8: offerName,
    pushid: offerId
  });
};

document.addEventListener("DOMContentLoaded", () => {
  new __thankYou__();
});
