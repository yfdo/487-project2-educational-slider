var myPresentation = function () {
    var wrapper = null;
    var defClass = null;
    var slides = null;
    var slidesNum = null;
    var nextButton = document.createElement('a');
    var prevButton = document.createElement('a');
    var currentSlide = parseInt(window.location.hash.replace('#', '') || 0);

    function config(_params) {
        var params = _params || {};
        wrapper = params.wrapper || document.getElementById('slideShow');
        slides = params.slides || wrapper.getElementsByClassName('slide');
        slidesNum = slides.length;
        defClass = params.defClass || 'slide';
    }

    function init() {
        if (!wrapper) {
            config();
        }

        var timeline_text = ['intro', '1982', '1995', '1998', 'more', 'quiz'];

        /*create timeline dots*/
        for (let i = 0; i < slidesNum; i++) {
            var dot = document.createElement('span');
            dot.className = "dot";
            dot.innerText = timeline_text[i];
            dot.onclick = function () {
                currentSlide = i;
                step();
            };
            document.getElementById('dots-div').appendChild(dot);
        };


        document.body.appendChild(nextButton);
        document.body.appendChild(prevButton);
        nextButton.className = 'next nav-button';
        nextButton.id = 'next-button';
        prevButton.className = 'prev nav-button';
        prevButton.id = 'prev-button';

        cb_addEventListener(nextButton, 'click', goNext);
        cb_addEventListener(prevButton, 'click', goBack);
        cb_addEventListener(document, 'keyup', keyUpEv);
        showSlide(currentSlide);
        checkButtons()
    }

    function goNext() {
        if (slides[currentSlide + 1]) {
            ++currentSlide;
            step();
        }
        else {
            currentSlide = 0;
            step();
        }
    }

    function goBack() {
        if (slides[currentSlide - 1]) {
            --currentSlide;
            step();
        }
        else {
            currentSlide = slidesNum - 1;
            step();
        }
    }

    function step() {
        //hide timeline on quiz page
        /*
        if (currentSlide == slidesNum - 1) {
            document.getElementById('dots-div').style = "animation: hide-timeline 1s 0.5s forwards";
        }
        else {
            document.getElementById('dots-div').style = "display:block;";
        }
        */
        showSlide(currentSlide);
        window.location.hash = currentSlide;
        checkButtons();

        return false;
    }

    function checkButtons() {
        if (currentSlide === 0) {
            //prevButton.className += ' hidden';
        }
        else if (currentSlide === slidesNum - 1) {
            //nextButton.className += ' hidden';
        }
        else {
            nextButton.className = nextButton.className.replace(' hidden', '');
            prevButton.className = prevButton.className.replace(' hidden', '');
        }
    }

    function keyUpEv(event) {
        if (event.keyCode === 37) {
            goBack();
        }
        else if (event.keyCode === 39) {
            goNext();
        }
    }

    function showSlide(step) {
        var i = slidesNum;
        if (-1 < step && step < i) {
            while (i--) {
                slides[i].className = defClass;
            }
            slides[step].className += ' current';

            if (step > 0) {
                slides[step - 1].className += ' prev';
            }
            if (step + 1 < slidesNum) {
                slides[step + 1].className += ' next';
            }
        }
        else {
            return false;
        }

        //show active dot
        for (let i = 0; i < slidesNum; i++) {
            if (i == currentSlide) {
                document.getElementById('dots-div').children.item(i).className += " dot-active";
            }
            else {
                document.getElementById('dots-div').children.item(i).className = "dot";
            }
        }

    }

    return {
        config: config,
        init: init
    };
}();

/**
* Cross-browser Event Listener
**/

function cb_addEventListener(obj, evt, fnc) {
    if (obj && obj.addEventListener) {
        obj.addEventListener(evt, fnc, false);
        return true;
    }
    else if (obj && obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    return false;
};

myPresentation.config({
    wrapper: document.getElementById('slideShow')
});
myPresentation.init();


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();