document.addEventListener("DOMContentLoaded",
    function () {
        var imgs = [].slice.call(document.querySelectorAll('img[data-lazy-img-src]'));
        imgs.forEach(function (x) {
            x.style.filter = "blur(2px) invert(1)";
            var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var url = x.dataset.lazyImgSrc;
                            var newImage = new Image();
                            newImage.src = url;
                            newImage.onload = function () {
                                x.srcset = newImage.src;
                                x.style.filter = null;
                            }
                        lazyImageObserver.unobserve(x);
                    }
                });
            });
            lazyImageObserver.observe(x);
        });
    });