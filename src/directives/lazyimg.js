export default {
    install(Vue) {
        // let el = undefined;

        var loadImage = function (el) {
            const imageElement = Array.from(el.children).find(
                el => el.nodeName === "IMG"
            );
            if (imageElement) {
                imageElement.addEventListener("load", () => {
                    setTimeout(() => el.classList.add("loaded"), 100);
                });
                imageElement.addEventListener("error", () => console.log("error"));
                imageElement.src = imageElement.dataset.url;
            }
        }

        var handleIntersect = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }

        var createObserver = function (el) {
            const options = {
                root: null,
                threshold: "0"
            };
            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        }

        Vue.directive('lazyimg', {
            inserted(el) {
                if (window["IntersectionObserver"]) {
                    createObserver(el);
                } else {
                    loadImage(el);
                }
            }
        });
    }
}