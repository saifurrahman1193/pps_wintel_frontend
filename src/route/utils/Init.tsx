import feather from 'feather-icons';
import 'metismenu'; // Ensure metisMenu is imported if needed

declare interface JQuery {
    metisMenu(): JQuery;
}

function INIT(): void {
    (function (a: JQueryStatic): void {
        "use strict";
        
        let e: string | null = document.body.getAttribute("data-sidebar-size");
        // let t: string | null;
        // let n: HTMLElement | null;
        // let o: string | null = localStorage.getItem("minia-language");
        // const r: string = "en";

        // function i(t: string): void {
        //     const headerLangImg = document.getElementById("header-lang-img") as HTMLImageElement | null;
        //     if (headerLangImg) {
        //         headerLangImg.src = t === "en" 
        //             ? "assets/images/flags/us.jpg"
        //             : t === "sp"
        //             ? "assets/images/flags/spain.jpg"
        //             : t === "gr"
        //             ? "assets/images/flags/germany.jpg"
        //             : t === "it"
        //             ? "assets/images/flags/italy.jpg"
        //             : t === "ru"
        //             ? "assets/images/flags/russia.jpg"
        //             : headerLangImg.src;
                
        //         localStorage.setItem("minia-language", t);
        //         o = localStorage.getItem("minia-language");
        //         if (o === null) {
        //             i(r);
        //         }

        //         a.getJSON(`assets/lang/${o}.json`, function (data: any): void {
        //             a("html").attr("lang", o!);
        //             a.each(data, function (key: string, value: any): void {
        //                 if (key === "head") {
        //                     a(document).attr("title", value.title);
        //                 }
        //                 a(`[data-key='${key}']`).text(value);
        //             });
        //         });
        //     }
        // }

        function d(): void {
            const counters = document.querySelectorAll(".counter-value");
            counters.forEach(function (counter: Element): void {
                (function t(): void {
                    const target = +counter.getAttribute("data-target")!;
                    let current = +counter.innerHTML;
                    let increment = target / 250;
                    if (increment < 1) increment = 1;

                    if (current < target) {
                        counter.innerHTML = (current + increment).toFixed(0);
                        setTimeout(t, 1);
                    } else {
                        counter.innerHTML = target.toString();
                    }
                })();
            });
        }

        // function l(): void {
        //     const links = document.getElementById("topnav-menu-content")?.getElementsByTagName("a");
        //     if (links) {
        //         for (let i = 0; i < links.length; i++) {
        //             const parent = links[i].parentElement;
        //             if (parent && parent.getAttribute("class") === "nav-item dropdown active") {
        //                 parent.classList.remove("active");
        //                 if (links[i].nextElementSibling) {
        //                     links[i].nextElementSibling.classList.remove("show");
        //                 }
        //             }
        //         }
        //     }
        // }

        function s(id: string): void {
            const element = document.getElementById(id) as HTMLInputElement | null;
            if (element) {
                element.checked = true;
            }
        }

        // function c(): void {
        //     if (
        //         !document.webkitIsFullScreen &&
        //         !document.mozFullScreen &&
        //         !document.msFullscreenElement
        //     ) {
        //         a("body").removeClass("fullscreen-enable");
        //     }
        // }

        a("#side-menu").metisMenu();
        d();
        
        a(window).on("load", function (): void {
            // a(".switch").on("switch-change", function (): void {
            //     toggleWeather(); // Assuming this function is defined elsewhere.
            // });

            if (window.innerWidth >= 1024 && window.innerWidth <= 1366) {
                document.body.setAttribute("data-sidebar-size", "sm");
                s("sidebar-size-small");
            }
        });

        a("#vertical-menu-btn").on("click", function (event: JQuery.ClickEvent): void {
            event.preventDefault();
            a("body").toggleClass("sidebar-enable");
            if (a(window).width()! >= 992) {
                if (!e) {
                    const currentSize = document.body.getAttribute("data-sidebar-size");
                    if (currentSize === null || currentSize === "lg") {
                        document.body.setAttribute("data-sidebar-size", "sm");
                    } else {
                        document.body.setAttribute("data-sidebar-size", "lg");
                    }
                } else if (e === "md") {
                    if (document.body.getAttribute("data-sidebar-size") === "md") {
                        document.body.setAttribute("data-sidebar-size", "sm");
                    } else {
                        document.body.setAttribute("data-sidebar-size", "md");
                    }
                } else if (e === "sm") {
                    document.body.setAttribute("data-sidebar-size", "lg");
                } else {
                    document.body.setAttribute("data-sidebar-size", "sm");
                }
            }
        });

        a("#sidebar-menu a").each(function (): void {
            const href = window.location.href.split(/[?#]/)[0];
            if ((this as HTMLAnchorElement).href === href) {
                a(this).addClass("active");
                a(this).parent().addClass("mm-active");
                a(this).parent().parent().addClass("mm-show");
                a(this).parent().parent().prev().addClass("mm-active");
                a(this).parent().parent().parent().addClass("mm-active");
                a(this).parent().parent().parent().parent().addClass("mm-show");
                a(this).parent().parent().parent().parent().parent().addClass("mm-active");
            }
        });

        a(document).ready(function (): void {
            const sidebarMenu = a("#sidebar-menu");
            if (sidebarMenu.length > 0 && a("#sidebar-menu .mm-active .active").length > 0) {
                let topOffset = a("#sidebar-menu .mm-active .active").offset()?.top;
                if (topOffset && topOffset > 300) {
                    topOffset -= 300;
                    a(".vertical-menu .simplebar-content-wrapper").animate({
                        scrollTop: topOffset,
                    }, "slow");
                }
            }
        });

        // Additional functionality...
        // More functions here that follow the same pattern.
    })(jQuery);

    feather.replace();
}

export default INIT;
