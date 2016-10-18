function solve() {
    $.fn.datepicker = function () {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        var $this = $(this)
        var currDate = new Date();
        var deltaIndex = 0;
         Date.prototype.getMonthName = function () {
            return MONTH_NAMES[this.getMonth()];
        };

         Date.prototype.getDayName = function () {
            return WEEK_DAY_NAMES[this.getDay()];
        };
    // prototypes
    var $divProt = $('<div />'),
        $tableProt = $('<table />'),
        $buttonProt = $('<button />'),
        $anchProt = $('<a />'),
        $thProt = $('<th />'),
        $trProt = $('<tr />'),
        $tdProt = $('<td />');
   
   // wrapper
    var wrapper = $divProt.clone()
               .addClass('datepicker-wrapper');
    $this.addClass('datepicker')
         .wrap(wrapper);
    wrapper = $this.parent();

    // picker
    var $picker = $divProt.clone()
                 .addClass('picker') 
     // controls
     var $controls = $divProt.clone()
                     .addClass('controls');
     var $buttonLeft = $buttonProt.clone()
                       .addClass('btn')
                       .text('<')
                       .attr('data-index', '-1')
                       .appendTo($controls);
     var $currentMonth = $divProt.clone()
                         .addClass('current-month')
                         .text(currDate.getMonthName() + ' ' + currDate.getFullYear())
                         .appendTo($controls)
     var $buttonRight = $buttonProt.clone()
                       .addClass('btn')
                       .text('>')
                       .attr('data-index', '1')
                       .appendTo($controls);                   
          $controls.appendTo($picker);
    // calendar
     var $calendar = makeCalendar()
                     .addClass('calendar')
                     .appendTo($picker);
    // current Date
    var date = new Date();
    var $currDateDiv = $divProt.clone()
                              .addClass('current-date');
    var $currDateAnch = $anchProt.clone()
                                .addClass('current-date-link')
                                .attr('href', '#')
                                .text(date.getDate() + ' ' + date.getMonthName() + ' ' + date.getFullYear())
                                .appendTo($currDateDiv);
        $currDateDiv.appendTo($picker);                    
 //functions
   // make calendar                  
   function makeCalendar(){
    var $calendar = $tableProt.clone()
                    .addClass('calendar');
    var currentIndex = 0;
     // days of weak  
     var $headTr = $trProt.clone();
      for(var i = 0; i < 7; i += 1){
          var newTh = $thProt.clone()
                      .text(WEEK_DAY_NAMES[i])
                      .appendTo($headTr);
      }   
      $headTr.appendTo($calendar); 
      // calendar tr and td
     for(var r = 0; r < 6; r += 1) {
         var newTr = $trProt.clone();
         for(var c = 0; c < 7; c += 1) {
           var newTd = $tdProt.clone()
                       .appendTo(newTr)
         }
         newTr.appendTo($calendar)
     }
      // calendar dates
     var firstDayCurr = new Date();
         firstDayCurr.setDate(1);
         firstDayCurr.setMonth(firstDayCurr.getMonth() + deltaIndex)
     var lastDayCurr = new Date();
         lastDayCurr.setMonth(firstDayCurr.getMonth() + 1)
         lastDayCurr.setDate(0);
     var firstDayWeekCurr = firstDayCurr.getDay();
     var lastDayPrev = new Date();
         lastDayPrev.setMonth(firstDayCurr.getMonth());
         lastDayPrev.setDate(0);
     var lastMonthCount = firstDayCurr.getDay();
         if(lastMonthCount === 0) {
             lastMonthCount = 7
         }
     var firstDayNext = new Date();
         firstDayNext.setMonth(firstDayCurr.getMonth() + 1);
         firstDayNext.setDate(1);
    // calendar fill
     var $tdS = $calendar.find('td');
     var lastMonthleft = lastMonthCount;
     while(currentIndex < lastMonthCount) {
         $($tdS[currentIndex]).text(lastDayPrev.getDate() - lastMonthleft + 1)
                              .addClass('another-month')
         lastMonthleft -= 1;
         currentIndex += 1;
     }
     var currMonthIndex = currentIndex;
     var currMonthDate = 1;
     while(currentIndex < lastDayCurr.getDate() + currMonthIndex) {
         $($tdS[currentIndex]).text(currMonthDate)
                              .addClass('current-month');
         currentIndex += 1;
         currMonthDate += 1;
     }
     var nextMonthDate = 1
     while(currentIndex < $tdS.length) {
       $($tdS[currentIndex]).text(nextMonthDate)
                            .addClass('another-month');
       currentIndex += 1;
       nextMonthDate += 1;
     }

      return $calendar;       
   }   

  $controls.on('click', '.btn', function(ev){       
        var $target = $(ev.target);
        $calendar.remove();
        deltaIndex += +($target.attr('data-index'));
        $calendar = makeCalendar();
        $controls.after($calendar);
        currDate.setMonth(currDate.getMonth() + +($target.attr('data-index')));
        $currentMonth.text(currDate.getMonthName() + ' ' + currDate.getFullYear());
  })
  $calendar.on('click', '.current-month', function(ev){
      $target = $(ev.target);
      $this.val($target.text() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear());
      $picker.hide();
  })
  $this.on('click', function(ev){
      $picker.toggle();
  })
  $currDateAnch.on('click', function(ev){
     $this.val(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
     $picker.hide();
  })
$(document).on('click', function(ev){
    $target = $(ev.target);
    if(!($target.parents('.datepicker-wrapper').length)){
        $picker.hide();
    }
})
$picker.appendTo(wrapper);
        
  return $(this);

        	// you are welcome :)

    };
}