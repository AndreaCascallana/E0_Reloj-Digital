

window.addEventListener('load', () => {
    canvas();
    initClockEvents();
    crono();
});








/** 
 * 
 * CAMBIO DE RELOJ A CRONÓMETRO
 * 
 *  */

 
const initClockEvents = () => {

    // Global Vars
    let clockToggle = document.querySelector('.reloj_button');
    let stopwatchToggle = document.querySelector('.cronometro_button');

    let clock = document.querySelector('.reloj_time');
    let stopwatch = document.querySelector('.cronometro_time');

    let clockTitle = document.querySelector('.reloj_title');
    let stopwatchTitle = document.querySelector('.cronometro_title');

    let stopwatchButtons = document.querySelector('.buttons_top');

    let clockActive = false;
    let stopwatchActive = false;


    // Methods

    /** Reloj - Activar y desactivar la vista RELOJ */
    let activeClock = () => {
        clockToggle.classList.add('active');

        clock.classList.add('visible');
        clockTitle.classList.add('visible');

        stopwatch.classList.add('invisible');
        stopwatchTitle.classList.add('invisible');
        stopwatchButtons.classList.add('invisible');

        clockActive = true;
    }

    let unactiveClock = () => {
        clockToggle.classList.remove('active');

        clock.classList.remove('visible');
        clockTitle.classList.remove('visible');

        stopwatch.classList.remove('invisible');
        stopwatchTitle.classList.remove('invisible');
        stopwatchButtons.classList.remove('invisible');


        clockActive = false;
    }


    /** Cronómetro - Activar y desactivar la vista CRONÓMETRO */
    let activeStopwatch = () => {
        stopwatchToggle.classList.add('active');
        clockToggle.classList.add('unactive');

        clock.classList.add('invisible');
        clockTitle.classList.add('invisible');

        stopwatch.classList.add('visible');
        stopwatchTitle.classList.add('visible');
        stopwatchButtons.classList.add('visible');

        stopwatchActive = true;
    }

    let unactiveStopwatch = () => {
        stopwatchToggle.classList.remove('active');
        clockToggle.classList.remove('unactive');

        clock.classList.remove('invisible');
        clockTitle.classList.remove('invisible');

        stopwatch.classList.remove('visible');
        stopwatchTitle.classList.remove('visible');
        stopwatchButtons.classList.remove('visible');


        stopwatchActive = false;
    }


    // Events

    /** Reloj */
    clockToggle.addEventListener('click', () => {
        if(!clockActive) {
            activeClock();
            unactiveStopwatch();
        } else {
            unactiveClock();
            activeStopwatch();
        }
    });


    /** Cronómetro */
    stopwatchToggle.addEventListener('click', () => {
        if(!stopwatchActive) {
            unactiveClock();
            activeStopwatch();
        } else {
            activeClock();
            unactiveStopwatch();
        }
    });
};








/**
 * 
 * RELOJ
 * 
 */


const canvas = () => {
    const cvs = document.querySelector('.canvas');
	const ctx = cvs.getContext('2d');
	ctx.lineWidth = 8; //change here circles line-width
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '16px Red Hat Display'; //you can put the font outside canvas if you prefer
	ctx.fillStyle = '#333';

	function getTime(){
		let date = new Date();
	
		let h    = date.getHours();
		let s  = date.getSeconds();
		let m  = date.getMinutes();
	
		// Calculate percentage to be drawn
		var hp = 100 / 12 * (h % 12);
		var mp = 100 / 60 * m;
		var sp = 100 / 60 * s;
		
		// Ensure double digits
		let dateString = ( h < 10 ? '0' : '' ) + h + ' : ' + ( m < 10 ? '0' : '' ) + m + ' : ' + ( s < 10 ? '0' : '' ) + s;
	
		ctx.clearRect(0, 0, 350, 350);
		ctx.fillText(dateString, 175, 175);
		draw(95, hp, '#3D4180'); //change here circles radius y color
		draw(115, mp, '#5C61BF');
		draw(135, sp, '#7A81FF');			
	}
	
	/**
	 * Draw circles
	*/
	var draw = (function () {
		var start = 1.5 * Math.PI; // Start circle from top
		var end = (2 * Math.PI) / 100; // One percent of circle
	
		/**
		 * Draw percentage of a circle
		 *
		 * @param {number} r Radius
		 * @param {number} p Percentage of circle
		 * @param {string} c Stroke color
		 * @return void
		 */
		return function (r, p, c) {
			p = p || 100; // When time is '00' we show full circle
			ctx.strokeStyle = c;
			ctx.beginPath();
			ctx.arc(175, 175, r, start, p * end + start, false);
			ctx.stroke();
		};
	}());

    setInterval(getTime, 1000);
};




/**
 * 
 * CRONÓMETRO
 * 
 */

const crono = () => {

    // Global Vars

    // Asignamos eventos a cada uno de los botones
    let start = document.querySelector(".start_button");
    let pause = document.querySelector(".pause_button");
    let reset = document.querySelector(".reset_button");

    h = 0;
    m = 0;
    s = 0;
    document.querySelector(".hms").innerHTML="00:00:00";




    // Methods

    const cronometrar = () => {
        escribir();
        id = setInterval(escribir,1000);
        document.querySelector(".start_button").removeEventListener("click",cronometrar);
    };
    
    const escribir = () => {
        var hAux, mAux, sAux;
        s++;
        if (s>59){m++;s=0;}
        if (m>59){h++;m=0;}
        if (h>24){h=0;}
    
        if (s<10){sAux="0"+s;}else{sAux=s;}
        if (m<10){mAux="0"+m;}else{mAux=m;}
        if (h<10){hAux="0"+h;}else{hAux=h;}
    
        document.querySelector(".hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
    };
    
    const parar = () => {
        clearInterval(id);
        document.querySelector(".pause_button").addEventListener("click",cronometrar);
    
    };
    
    const reiniciar = () => {
        clearInterval(id);
        document.querySelector(".hms").innerHTML="00:00:00";
        h=0;m=0;s=0;
        document.querySelector(".start_button").addEventListener("click",cronometrar);
    };




    // Events
    start.addEventListener('click', () => {
        cronometrar();
    });

    pause.addEventListener('click', () => {
        parar();
    });

    reset.addEventListener('click', () => {
        reiniciar();
    });
};