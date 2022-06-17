// /* Javascript for CourserateXBlock. */
// function CourserateXBlock(runtime, element) {

//     function updateCount(result) {
//         $('.count input').val(result.rating);
//         $('.review input').val(result.review);
//     }

//     var handlerUrl = runtime.handlerUrl(element, 'increment_count');

//     $('.submit').click(function(eventObject) {
//         let data = {
//             'rating': $('.count input').val(),
//             'review': $('.review input').val()
//         }
//         $.ajax({
//             type: "POST",
//             url: handlerUrl,
//             data: JSON.stringify(data),
//             success: updateCount
//         });
//     });

//     $(function ($) {
//         /* Here's where you'd do things on page load. */
//     });
// }


/* Javascript for RateXBlock. */
// Work-around so we can log in edx-platform, but not fail in Workbench
if (typeof Logger === 'undefined') {
    var Logger = {
        log: function(a, b) { 
	    console.log("<<Log>>"); 
	    console.log(a);
	    console.log(b);
	    console.log("<</Log>>"); 
	}
    };
}

function CourserateXBlock(runtime, element) {
    var feedback_handler = runtime.handlerUrl(element, 'feedback');

    $(".rate_submit_feedback", element).click(function(eventObject) {
	var freeform = $(".rate_freeform_area", element).val();
	var vote = 0;
	if ($(".rate_radio:checked", element).length === 0) {
	    vote = -1;
	} else {
	    vote = parseInt($(".rate_radio:checked", element).attr("id").split("_")[1]);
	}
	var feedback = {"freeform": freeform, 
		    "vote": vote};
	Logger.log("edx.ratexblock.submitted", feedback);
	$.ajax({
            type: "POST",
            url: feedback_handler,
            data: JSON.stringify(feedback),
	    success: function(data) {$('.rate_thank_you', element).text(data.response);}
        });
    });

    $('.rate_radio', element).change(function(eventObject) {
	var target_id = eventObject.target.id;
	var vote = parseInt(target_id.split('_')[1]);
	Logger.log("edx.ratexblock.likert_clicked", {"vote":vote});
    });

    $('.rate_freeform_area', element).change(function(eventObject) {
	var freeform = eventObject.currentTarget.value;
	Logger.log("edx.ratexblock.freeform_changed", {"freeform":freeform});
    });

}

