ColorTimer = function () {
    //public vars
    this.start_color = '#47B1C2';
    this.end_color = '#E0004F';
    this.time_length = 0;
    this.cur_time = 0;
    this.interval = 1000;
    //public state vars
    this.ticking = false;
    this.stopped = false;
    this.paused = false;
    //private vars
    var pause_color = '#000000';
    var pause_time = 0;
    var timer_id = 0
    var this_object
    // Event: Tick
    this.Tick = function () {
        this.cur_time -= 1;
        console.log(this.cur_time + ' cur');

        if (this.cur_time <= 0) {
            console.log('boom');
            this.stop_reset();
        }

    }

    // Function: Start the timer
    this.start = function () {
        
        this_object = this;
        // if alrady ticking return false
        if (this.ticking)
        {
            return false;
        }
        // if timer is paused unpause and set new time to setInterval
        // else grab value from form field
        if (this.paused)
        {
            this.time_length = pause_time;
            this.paused = false;
        } else {
            this.time_length = $("#t_in").val()
        }
        // set current time time the total length
        this.cur_time = this_object.time_length;
        timer_id = setInterval(
            function()
            {
                this_object.Tick(); 
            }, this.interval);
        // set state to ticking
        this.ticking = true;
        // change the css transition length and set new background color
        $('body').css({
            'transition' : 'background-color ' + this.time_length + 's ease'
        });
        $('body').css({'background-color' : this.end_color });
        
    };
     // Function: stops and resets the timer
    this.stop_reset = function () {
        this.ticking = false;
        this.stopped = true;
        clearInterval(timer_id);
        console.log('reset');
        // reset current time to total time
        this.cur_time = this.time_length;
        //change transition to 1ms and set background color to start color
        $('body').css({
            'transition' : 'background-color 1ms ease'
        });
        $('body').css({'background-color' : this.start_color });
    };
     // Function: Pause the timer
    this.pause = function () {
        // if not ticking return false
        if (this.ticking == false)
        {
            return false;
        }
        console.log('pause');
        this.ticking = false;
        this.paused = true;
        clearInterval(timer_id);
        pause_time = this.cur_time;
        // get current color and
        // change transition to 1ms and set background color to current color color
        pause_color = $('body').css('backgroundColor');
        $('body').css({
            'transition' : 'background-color 1ms ease'
        });
        $('body').css({'background-color' : pause_color });
        
    };
 }

$( document ).ready(function() {

    // create colorTimer
    var obj = new ColorTimer();
    // set initial background color
    $('body').css({'background-color' : obj.start_color });

    //control buttons
    $( ".start_btn" ).on('click',function() {
      console.log( "clicked start" );
      obj.start();
    });
    $( ".pause_btn" ).on('click',function() {
      console.log( "clicked pause" );
      obj.pause();
    });
});
