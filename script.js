ColorTimer = function (start_color, end_color) {
    //public vars
    this.start_color = start_color;
    this.end_color = end_color;
    this.time_length = 0;
    this.cur_time = 0;
    this.interval = 1000;
    //public state vars
    this.ticking = false;
    this.expiered = false;
    this.reset = true;
    this.paused = false;
    //private vars
    var pause_color = '#000000';
    var pause_time = 0;
    var timer_id = 0
    var this_object
    
    this.remove_transition = function (bg_color) {
    console.log('remove trans');
       $('body').css({
            'transition' : 'background-color 1ms ease'
        });
        $('body').css({'background-color' : bg_color });
    }
    this.create_transition = function (time_to) {
    console.log('create trans');
        $('body').css({
            'transition' : 'background-color ' + time_to + 's ease'
        });
        $('body').css({'background-color' : this.end_color });
    }
    // timer tick checks for time up
    this.Tick = function () {
        this.cur_time -= 1;
        console.log(this.cur_time + ' cur');

        if (this.cur_time <= 0) {
            
            this.expire();
            
        }

    }

    // starts the timer
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
        this.ticking_state();
        this.ticking = true;
        // change the css transition length and set new background color
        this.create_transition (this.time_length)
        
        
    };
     //  expires timer
    this.expire = function () {
        console.log('boom');
        this.expired_state();
        this.paused = false
        this.ticking = false;
        this.expired = true;
        clearInterval(timer_id);
        console.log('expire');
    };
    // resets the timer
    this.reset = function () {
        
        this.expire();
        console.log('reset');
        
        this.initial_state();
        // reset current time to total time
        this.cur_time = this.time_length;
        console.log(this.time_length + " **************")
        //change transition to 1ms and set background color to start color
        this.remove_transition(this.start_color);
        
    };
    // pauses the timer
    this.pause = function () {
        // if not ticking return false
        this.paused_state();
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
        this.remove_transition(pause_color);
        
    };
    
    // states
    this.initial_state = function () {
        $('.state_label').html(' initial');
        $('body').css({'background-color' : this.start_color });
        $('.t_group_input').show();
        $('.t_group_cur').hide();
        $('.start_btn').show();
        $('.pause_btn').hide();
        $('.settings_btn').hide();
        $('.reset_btn').hide();
        $('body').removeAttr('class');
        $('body').addClass('pattern_box');

    };
    this.paused_state = function () {
        $('.state_label').html(' paused');
        $('.t_group_input').hide();
        $('.t_group_cur').show();
        $('.t_cur').html(this.cur_time);
        $('.start_btn').show();
        $('.pause_btn').hide();
        $('.settings_btn').hide();
        $('.reset_btn').show();
        $('body').removeAttr('class');


    };
    this.ticking_state = function () {
        $('.state_label').html(' ticking');
        $('.t_group_input').hide();
        $('.t_group_cur').hide();
        $('.start_btn').hide();
        $('.pause_btn').show();
        $('.settings_btn').show();
        $('.reset_btn').show();
        $('body').removeAttr('class');

    };
    this.expired_state = function () {
        $('.state_label').html(' expired');
        $('.t_group_input').hide();
        $('.start_btn').hide();
        $('.pause_btn').hide();
        $('.settings_btn').hide();
        $('.reset_btn').show();
        $('.t_group_cur').show();
        $('.t_cur').html('00');
        $('body').removeAttr('class');
        $('body').addClass('pattern_diag');

    };
    
 }

$( document ).ready(function() {

    // create colorTimer
    var obj = new ColorTimer('#74B486', '#FF0022');
    // set initial background color
    obj.initial_state()
    //control buttons
    $( ".start_btn" ).on('click',function() {
      console.log( "clicked start" );
      obj.start();
    });
    $( ".pause_btn" ).on('click',function() {
      console.log( "clicked pause" );
      obj.pause();
    });
    $( ".reset_btn" ).on('click',function() {
      console.log( "clicked reset" );
      obj.reset();
    });
    $( ".settings_btn" ).on('click',function() {
      console.log( "clicked reset" );
      obj.pause();
    });
    $("#start_color").spectrum({
        color: "#74B486",
        change: function(color) {
            obj.start_color = color;
        }
    });
    $("#end_color").spectrum({
        color: "#FF0022",
        change: function(color) {
            obj.end_color = color;
        }
    });

});
